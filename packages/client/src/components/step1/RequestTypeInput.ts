import Component from '../../core/Component'
import { Step1State } from './Step1'
import { t } from '../../language/index'

interface Props {
  requestUrl: string
  updateState: (state: Partial<Step1State>) => void
}

export default class RequestTypeInput extends Component<Props> {
  template() {
    const { requestUrl } = this.props

    return `
      <div class="mb-6">
        <input id='video-url' placeholder="${t(
          'step1.requestTypeInput.placeholder'
        )}" value="${requestUrl}" type='text' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
      </div>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#video-url')
      ?.addEventListener('change', this.handleUrlChange.bind(this))
  }

  handleUrlChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.props.updateState({ requestUrl: input.value })
  }
}
