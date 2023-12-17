import { loadingTemplate, step1Template } from './template'
import axios from './axios'

export default class Step1 {
  target: HTMLDivElement
  container: HTMLDivElement
  input: HTMLInputElement
  startTime: HTMLInputElement
  endTime: HTMLInputElement

  constructor(target: HTMLDivElement) {
    this.target = target
    this.render()

    this.input = document.querySelector('.url-input') as HTMLInputElement
    this.container = document.querySelector(
      '.step1-container'
    ) as HTMLInputElement
    this.startTime = document.querySelector('.startTime') as HTMLInputElement
    this.endTime = document.querySelector('.endTime') as HTMLInputElement
  }

  render() {
    this.target.innerHTML = step1Template
  }

  delete() {
    this.target.innerHTML = ''
  }

  loading() {
    this.container.innerHTML = loadingTemplate
  }

  convertTimeToDurationSeconds(startTime: string, endTime: string): number {
    const sTime = startTime.split(':')
    const eTime = endTime.split(':')
    const getTotalSeconds = (time: string[]) =>
      parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2])

    return getTotalSeconds(eTime) - getTotalSeconds(sTime)
  }

  async onButtonClick() {
    this.loading()
    const screenshot = await this.createScreenshots()
    const duration = this.convertTimeToDurationSeconds(
      this.startTime.value,
      this.endTime.value
    )

    const res = {
      url: this.input.value,
      id: screenshot.id,
      state: screenshot.state,
      startTime: this.startTime.value,
      duration,
      imageSrc: `data:image/png;base64,${screenshot.image}`,
    }

    return res
  }

  async createScreenshots() {
    const res = await axios.post('/screenshots', {
      url: this.input.value,
      startTime: this.startTime.value,
    })

    return res.data
  }
}
