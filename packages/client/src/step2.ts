import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

interface InsertProps {
  imageSrc: string
  id: string
  startTime: string
  duration: number
  url: string
  wsClientId: string
}

export default class Step2 {
  target: HTMLDivElement
  imageSrc: string | undefined
  url: string | undefined
  id: string | undefined
  startTime: string | undefined
  duration: number | undefined
  cropData: object | undefined
  wsClientId: string | undefined
  $speed: HTMLSelectElement | undefined
  $image: HTMLImageElement | undefined
  $preview: HTMLDivElement | undefined
  $resize: HTMLInputElement | undefined

  constructor(target: HTMLDivElement) {
    this.target = target
  }

  insert({ imageSrc, id, startTime, duration, url, wsClientId }: InsertProps) {
    this.imageSrc = imageSrc
    this.url = url
    this.id = id
    this.startTime = startTime
    this.duration = duration
    this.wsClientId = wsClientId

    this.render()
    this.setCropper(this)
  }

  render() {
    this.target.innerHTML = `
      <div>
        <div class="my-2">
          <h2 class="text-2xl font-bold dark:text-white mb-2">자르기</h2>
          <div>
            <img class="image" src=${this.imageSrc} alt="이미지" />
          </div>
        </div>
          <div class="my-2">
            <h3 class="text-xl font-bold dark:text-white mb-2">프리뷰</h3>
            <div class="preview w-[420px] h-[420px] overflow-hidden bg-slate-400 [&>*]:w-full"></div>
          </div>
          <div>
            <h2 class="text-2xl font-bold dark:text-white mb-2">옵션</h2>
            <div class="mb-6">
              <label for="resize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">리사이징 [PX]</label>
              <input value="500" type="number" id="resize" class="resize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <label for="speed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">속도</label>
            <select id="speed" class="speed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="0.5">빠르게</option>
              <option value="1" selected>기본</option>
              <option value="2">느리게</option>
            </select>
          </div>
          <button type="button" class="create-gif w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">움짤 생성</button>
      </div>
    `

    this.$image = document.querySelector('.image') as HTMLImageElement
    this.$preview = document.querySelector('.preview') as HTMLDivElement
    this.$resize = document.querySelector('.resize') as HTMLInputElement
    this.$speed = document.querySelector('.speed') as HTMLSelectElement
  }

  delete() {
    this.target.innerHTML = ''
  }

  progressRender() {
    this.target.innerHTML = `
      <div class="w-full">
        <div class="flex justify-between mb-1">
          <span class="text-base font-medium text-blue-700 dark:text-white">Generating...</span>
          <span class="text text-sm font-medium text-blue-700 dark:text-white">0%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div class="fill w-0 bg-blue-600 h-2.5 rounded-full transition-[width]"></div>
        </div>
      <div>
    `
  }

  setProgressPercent(frame: number) {
    const percent = ((frame / (30 * (this.duration ?? 1))) * 100).toFixed(0)
    const $text = document.querySelector('.text') as HTMLDivElement
    const $fill = document.querySelector('.fill') as HTMLDivElement
    $text.textContent = percent + '%'
    $fill.style.width = percent + '%'
  }

  setCropper(t: Step2) {
    new Cropper(this.$image as HTMLImageElement, {
      viewMode: 2,
      preview: this.$preview,
      background: false,
      zoomable: false,
      crop(e) {
        t.cropData = e.detail
      },
    })
  }

  async createGIF() {
    console.log('createGIF')
    const res = await fetch(`http://localhost:4000/gif`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.url,
        id: this.id,
        time: [this.startTime, this.duration],
        cropData: this.cropData,
        resizeWidth: this.$resize?.value,
        speed: this.$speed?.options[this.$speed.selectedIndex].value,
        wsClientId: this.wsClientId,
      }),
    })

    return await res.json()
  }

  async getGIF() {
    console.log('getGIF')
    const res = await fetch(`http://localhost:4000/gif/${this.id}`)
    const blob = await res.blob()
    const url = window.URL.createObjectURL(
      new Blob([blob], { type: 'image/gif' })
    )
    return url
  }

  async onButtonClick() {
    this.delete()
    this.progressRender()
    await this.createGIF()
    const url = await this.getGIF()

    return {
      state: 'success',
      url,
    }
  }
}
