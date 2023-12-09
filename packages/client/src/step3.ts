export default class Step3 {
  target: HTMLDivElement
  url: string | undefined
  $download: HTMLAnchorElement | undefined

  constructor(target: HTMLDivElement) {
    this.target = target
  }

  insert(url: string) {
    this.url = url
    this.render()
    this.$download = document.querySelector('download') as HTMLAnchorElement
  }

  render() {
    this.target.innerHTML = `
      <a href=${this.url} download>다운로드</a>
    `
  }
}
