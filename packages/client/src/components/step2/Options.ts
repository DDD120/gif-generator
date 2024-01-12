import Component from '../../core/Component'
import { Step2Ref } from './Step2'

interface Props {
  ref: Step2Ref
  updateRef: (state: Partial<Step2Ref>) => void
}

export default class Options extends Component<Props> {
  template() {
    const { resizeWidth } = this.props.ref

    return `
      <h2 class="text-2xl font-bold dark:text-white mb-2">옵션</h2>
      <div class="mb-6">
        <label for="resize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">넓이 조절 (px 단위)</label>
          <input value="${resizeWidth}" type="number" id="resize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <label for="speed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">속도</label>
      <select id="speed" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="0.5">빠르게</option>
          <option value="1" selected>기본</option>
          <option value="2">느리게</option>
        </select>
      </div>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#resize')
      ?.addEventListener('change', this.handleWidthChange.bind(this))
    this.$target
      .querySelector('#speed')
      ?.addEventListener('change', this.handleSpeedChange.bind(this))
  }

  handleWidthChange(e: Event) {
    this.props.updateRef({
      resizeWidth: (e.target as HTMLInputElement).value,
    })
  }

  handleSpeedChange(e: Event) {
    this.props.updateRef({
      speed: Number((e.target as HTMLSelectElement).value),
    })
  }
}
