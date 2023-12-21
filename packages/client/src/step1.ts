import { loadingTemplate, step1Template } from './template'
import axios from './axios'

export default class Step1 {
  private $container: HTMLElement
  private $url: HTMLInputElement
  private $startTime: HTMLInputElement
  private $endTime: HTMLInputElement
  private $vidoeURL: HTMLFormElement

  constructor(private $target: HTMLDivElement) {
    this.$target = $target
    this.render()

    this.$container = document.getElementById('step1-container')!
    this.$url = document.getElementById('url-input') as HTMLInputElement
    this.$startTime = document.getElementById('start-time') as HTMLInputElement
    this.$endTime = document.getElementById('end-time') as HTMLInputElement
    this.$vidoeURL = document.getElementById('video-radio') as HTMLFormElement

    this.$vidoeURL.addEventListener('change', this.onRadioChange)
  }

  render() {
    this.$target.innerHTML = step1Template()
  }

  delete() {
    this.$target.innerHTML = ''
  }

  loading() {
    this.$container.innerHTML = loadingTemplate()
  }

  convertTimeToDurationSeconds(startTime: string, endTime: string): number {
    const sTime = startTime.split(':')
    const eTime = endTime.split(':')
    const getTotalSeconds = (time: string[]) =>
      parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2])

    return getTotalSeconds(eTime) - getTotalSeconds(sTime)
  }

  onRadioChange(e: Event) {
    const $urlInput = document.getElementById('video-url') as HTMLInputElement
    const $fileUpload = document.getElementById(
      'file-upload'
    ) as HTMLInputElement

    if ((e.target as HTMLInputElement).value === 'video-url-radio') {
      $urlInput.style.display = 'block'
      $fileUpload.style.display = 'none'
    } else {
      $urlInput.style.display = 'none'
      $fileUpload.style.display = 'block'
    }
  }

  async onButtonClick() {
    this.loading()
    const screenshot = await this.createScreenshots()
    const duration = this.convertTimeToDurationSeconds(
      this.$startTime.value,
      this.$endTime.value
    )

    const res = {
      url: this.$url.value,
      id: screenshot.id,
      state: screenshot.state,
      startTime: this.$startTime.value,
      duration,
      imageSrc: `data:image/png;base64,${screenshot.image}`,
    }

    return res
  }

  async createScreenshots() {
    const res = await axios.post('/screenshots', {
      url: this.$url.value,
      startTime: this.$startTime.value,
    })

    return res.data
  }
}
