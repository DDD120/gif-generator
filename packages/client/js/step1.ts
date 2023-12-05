export default class Step1 {
  target: HTMLDivElement
  input: HTMLInputElement
  startTime: HTMLInputElement
  endTime: HTMLInputElement

  constructor(target: HTMLDivElement) {
    this.target = target
    this.render()

    this.input = document.querySelector('.url-input') as HTMLInputElement
    this.startTime = document.querySelector('.startTime') as HTMLInputElement
    this.endTime = document.querySelector('.endTime') as HTMLInputElement
  }

  render() {
    this.target.innerHTML = `
    <div>
      <label>비디오 URL</label>
      <input class="url-input" name="url" type="text" value="./video/abc.mp4" />
    </div>
    <div>
      <label>시작 시간</label>
      <input class="startTime" placeholder="00:00" value="00:00:02" />
      <label>종료 시간</label>
      <input class="endTime" placeholder="00:00" value="00:00:03" />
    </div>
    <button class="get-screenshot">스크린샷 얻기</button>
  `
  }

  delete() {
    this.target.innerHTML = ''
  }

  convertTimeToDurationSeconds(startTime: string, endTime: string): number {
    const [startHours, startMinutes, startSeconds] = startTime.split(':')
    const [endHours, endMinutes, endSeconds] = endTime.split(':')
    const startTotalSeconds =
      parseInt(startHours) * 3600 +
      parseInt(startMinutes) * 60 +
      parseInt(startSeconds)
    const endTotalSeconds =
      parseInt(endHours) * 3600 +
      parseInt(endMinutes) * 60 +
      parseInt(endSeconds)
    return endTotalSeconds - startTotalSeconds
  }

  async onButtonClick() {
    const screenshot = await this.createScreenshots(this.input.value)
    const duration = this.convertTimeToDurationSeconds(
      this.startTime.value,
      this.endTime.value
    )

    return {
      url: this.input.value,
      id: screenshot.id,
      state: screenshot.state,
      time: [this.startTime.value, duration],
      imageSrc: `data:image/png;base64,${screenshot.image}`,
    }
  }

  async createScreenshots(url: string) {
    const res = await fetch(`http://localhost:4000/screenshots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        startTime: this.startTime.value,
      }),
    })
    return res.json()
  }
}
