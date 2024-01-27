import Component from '../../core/Component'
import { store } from '../../store/store'
import api from '../../api/api'
import Step2, { Step2State } from './Step2'
import ErrorToast from '../ErrorToast'
import { t } from '../../language'

interface Props {
  step2: Step2
  updateState: (state: Partial<Step2State>) => void
}

export default class Button extends Component<Props> {
  template() {
    return `
      <button id="step2-button" type="button" class="w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">${t(
        'step2.button'
      )}</button>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#step2-button')
      ?.addEventListener('click', this.handleClick.bind(this))
  }

  async handleClick() {
    const { step2, updateState } = this.props
    if (!step2.ref.cropData) return
    updateState({ loading: true })
    try {
      await this.createGIF()
      const src = await this.getGIF()
      store.setState({ step: 3, gifSrc: src })
    } catch {
      store.reset()
      const $target = document.querySelector('#toast')!
      new ErrorToast($target, {
        title: t('step2.errorMessage.title'),
        message: t('step2.errorMessage.message'),
      })
    } finally {
      updateState({ loading: false })
    }
  }

  async createGIF() {
    const { requestUrl, id, startTime, duration } = store.state
    const { cropData, resizeWidth, speed, wsClientId } = this.props.step2.ref
    const res = await api
      .post('gif', {
        json: {
          requestUrl,
          id,
          startTime,
          duration,
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
