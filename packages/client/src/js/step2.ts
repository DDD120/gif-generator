import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

interface InsertProps {
  imageSrc: string
  id: string
  time: (string | number)[]
  url: string
}

export default class Step2 {
  target: HTMLDivElement
  imageSrc: string
  url: string
  id: string
  time: (string | number)[]
  cropData: object
  $speed: HTMLSelectElement
  $image: HTMLImageElement
  $preview: HTMLDivElement
  $resize: HTMLInputElement

  constructor(target: HTMLDivElement) {
    this.target = target
  }

  insert({ imageSrc, id, time, url }: InsertProps) {
    this.imageSrc = imageSrc
    this.url = url
    this.id = id
    this.time = time

    this.render()
    this.setCropper(this)
  }

  render() {
    this.target.innerHTML = `
      <div class="preview"></div>
      <div class="img-box">
        <img class="image" src=${this.imageSrc} alt="이미지" />
      </div>
      <label>리사이징 [PX]</label>
      <input class="resize" type="number" value="500" />
      <button class="create-gif">움짤 생성</button>
      <select class="speed">
        <option value="0.5">빠르게</option>
        <option value="1" selected>기본</option>
        <option value="2">느리게</option>
      </select>
    `

    this.$image = document.querySelector('.image')
    this.$preview = document.querySelector('.preview')
    this.$resize = document.querySelector('.resize')
    this.$speed = document.querySelector('.speed')
  }

  delete() {
    this.target.innerHTML = ''
  }

  progress(percent: number) {
    this.target.innerHTML = `
      <h1>progress</h1>
      <div>${percent}</div>
    `
  }

  setCropper(t: Step2) {
    new Cropper(this.$image, {
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
        time: this.time,
        cropData: this.cropData,
        resizeWidth: this.$resize.value,
        speed: this.$speed.options[this.$speed.selectedIndex].value,
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
    await this.createGIF()
    const url = await this.getGIF()

    return {
      state: 'success',
      url,
    }
  }
}
