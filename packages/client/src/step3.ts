import { step3Template } from './template'

export default class Step3 {
  target: HTMLDivElement
  url: string | undefined

  constructor(target: HTMLDivElement) {
    this.target = target
  }

  insert(url: string) {
    this.url = url
    this.render()
  }

  render() {
    this.target.innerHTML = step3Template(this.url!)
    const $download = document.querySelector('.download') as HTMLAnchorElement
    const $input = document.getElementById(
      'gif-download-filename'
    ) as HTMLInputElement
    $input.addEventListener('change', () => {
      $download.setAttribute('download', $input.value)
    })
  }
}
