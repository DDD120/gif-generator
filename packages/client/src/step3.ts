import { step3Template } from './template'

export default class Step3 {
  private url?: string
  private $download?: HTMLAnchorElement
  private $input?: HTMLInputElement

  constructor(private $target: HTMLDivElement) {}

  insert(url: string) {
    this.url = url
    this.render()
  }

  render() {
    if (!this.url) return
    this.$target.innerHTML = step3Template(this.url)
    this.$download = document.getElementById('download') as HTMLAnchorElement
    this.$input = document.getElementById(
      'gif-download-filename'
    ) as HTMLInputElement
    this.$input.addEventListener('change', this.handleFilenameChange)
  }

  handleFilenameChange() {
    if (!this.$download || !this.$input) return
    this.$download.setAttribute('download', this.$input.value)
  }
}
