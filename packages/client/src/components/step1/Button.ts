import Component from '../../core/Component'
import api from '../../api/api'
import { store } from '../../store/store'
import { Step1State } from './Step1'
import ErrorToast from '../ErrorToast'

interface Props {
  requestUrl: string
  startTime: string
  endTime: string
  updateState: (state: Partial<Step1State>) => void
}

interface Response {
  state: 'success' | 'failure'
  data: {
    id: string
    screenshotSrc: string
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
    const { startTime, endTime, requestUrl, updateState } = this.props
    updateState({ loading: true })

    try {
      const screenshot = await this.createScreenshots()
      const { id, screenshotSrc } = screenshot.data
      store.setState({
        requestUrl,
        id,
        startTime,
        duration: this.getDuration(startTime, endTime),
        screenshotSrc,
        step: 2,
      })
    } catch (e) {
      const $target = document.querySelector('#toast')!
      new ErrorToast($target, {
        title: '요청에 실패하였습니다.',
        message: '올바른 정보인지 확인해주세요.',
      })
    } finally {
      updateState({ loading: false })
    }
  }

  async createScreenshots() {
    const { requestUrl, startTime } = this.props
    const res = (await api
      .post('screenshots', {
        json: {
          requestUrl,
          startTime,
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
