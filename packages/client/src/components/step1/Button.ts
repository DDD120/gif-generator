import Component from '../../core/Component'
import api from '../../api/api'
import { store } from '../../store/store'

interface Props {
  url: string
  startTime: string
  endTime: string
}

interface Response {
  state: 'success' | 'fail'
  data: {
    id: string
    image: string
  }
}

export default class Button extends Component<Props> {
  template() {
    return `
      <button id="step1-button" type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">완료</button>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#step1-button')!
      .addEventListener('click', this.handleClick.bind(this))
  }

  async handleClick() {
    const screenshot = await this.createScreenshots()
    if (screenshot.state === 'success') {
      const { id, image } = screenshot.data
      const { startTime, endTime, url } = this.props

      store.setState({
        step: 2,
        url,
        id,
        startTime,
        duration: this.getDuration(startTime, endTime),
        imageSrc: `data:image/png;base64,${image}`,
      })
    }
  }

  async createScreenshots() {
    const res = (await api
      .post('screenshots', {
        json: {
          url: this.props.url,
          startTime: this.props.startTime,
        },
      })
      .json()) as Response

    return res
  }

  getDuration(startTime: string, endTime: string): number {
    const sTime = startTime.split(':')
    const eTime = endTime.split(':')
    const getTotalSeconds = (time: string[]) =>
      parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2])

    return getTotalSeconds(eTime) - getTotalSeconds(sTime)
  }
}
