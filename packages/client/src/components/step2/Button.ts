import Component from '../../core/Component'
import { store } from '../../store/store'
import api from '../../api/api'
import { Step2State } from './Step2'

interface Props {
  cropData: Cropper.Data | undefined
  resizeWidth: string
  speed: string
  wsClientId: string
  updateState: (state: Partial<Step2State>) => void
}

export default class Button extends Component<Props> {
  template() {
    return `
      <button id="step2-button" type="button" class="w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">완료</button>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#step2-button')
      ?.addEventListener('click', this.handleClick.bind(this))
  }

  async handleClick() {
    if (!this.props.cropData) return
    this.props.updateState({ loading: true })
    await this.createGIF()
    const src = await this.getGIF()
    store.setState({ step: 3, imgSrc: src })
  }

  async createGIF() {
    const { url, id, startTime, duration } = store.state
    const { cropData, resizeWidth, speed, wsClientId } = this.props

    const res = await api
      .post('gif', {
        json: {
          url,
          id,
          time: [startTime, duration],
          cropData,
          resizeWidth,
          speed,
          wsClientId,
        },
      })
      .json()

    return res
  }

  async getGIF() {
    const { id } = store.state
    const res = await api.get(`gif/${id}`).blob()
    const url = window.URL.createObjectURL(
      new Blob([res], { type: 'image/gif' })
    )
    return url
  }
}
