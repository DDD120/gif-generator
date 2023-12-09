export default class Step3 {
  target: HTMLDivElement
  url: string
  $download: HTMLAnchorElement

  constructor(target: HTMLDivElement) {
    this.target = target
  }

  insert(url: string) {
    this.url = url
    this.render()
    this.$download = document.querySelector('download')
  }

  render() {
    this.target.innerHTML = `
      <a href=${this.url} download>다운로드</a>
    `
  }
}
