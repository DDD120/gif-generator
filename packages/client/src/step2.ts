import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { progressTemplate, step2Template } from './template'
import axios from './axios'

interface InsertProps {
  imageSrc: string
  id: string
  startTime: string
  duration: number
  url: string
  wsClientId: string
}

export default class Step2 {
  private imageSrc?: string
  private url?: string
  private id?: string
  private startTime?: string
  private duration?: number
  private cropData?: object
  private wsClientId?: string
  private $container?: HTMLElement
  private $speed?: HTMLSelectElement
  private $img?: HTMLImageElement
  private $preview?: HTMLDivElement
  private $resize?: HTMLInputElement

  constructor(private target: HTMLDivElement) {}

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
    if (!this.imageSrc) return
    this.target.innerHTML = step2Template(this.imageSrc)

    this.$container = document.getElementById('step2-container')!
    this.$img = document.getElementById('img') as HTMLImageElement
    this.$preview = document.getElementById('preview') as HTMLDivElement
    this.$resize = document.getElementById('resize') as HTMLInputElement
    this.$speed = document.getElementById('speed') as HTMLSelectElement
  }

  delete() {
    this.target.innerHTML = ''
  }

  progressRender() {
    if (!this.$container) return
    this.$container.innerHTML = progressTemplate()
  }

  setProgressPercent(frame: number) {
    const percent = ((frame / (30 * (this.duration ?? 1))) * 100).toFixed(0)
    const $text = document.querySelector('.text') as HTMLDivElement
    const $fill = document.querySelector('.fill') as HTMLDivElement
    $text.textContent = percent + '%'
    $fill.style.width = percent + '%'
  }

  setCropper(t: Step2) {
    if (!this.$img) return
    new Cropper(this.$img, {
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
    const res = await axios.post('/gif', {
      url: this.url,
      id: this.id,
      time: [this.startTime, this.duration],
      cropData: this.cropData,
      resizeWidth: this.$resize?.value,
      speed: this.$speed?.options[this.$speed.selectedIndex].value,
      wsClientId: this.wsClientId,
    })

    return res.data
  }

  async getGIF() {
    const res = await axios.get(`/gif/${this.id}`, {
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: 'image/gif' })
    )
    return url
  }

  async onButtonClick() {
    this.progressRender()
    await this.createGIF()
    const url = await this.getGIF()

    const res = {
      state: 'success',
      url,
    }

    return res
  }
}
