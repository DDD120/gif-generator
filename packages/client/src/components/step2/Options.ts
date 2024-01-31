import Component from '../../core/Component'
import { Step2Ref } from './Step2'
import { t } from '../../language'

interface Props {
  ref: Step2Ref
  updateRef: (state: Partial<Step2Ref>) => void
}

export default class Options extends Component<Props> {
  template() {
    const { resizeWidth } = this.props.ref

    return `
      <h2 id="options-title" class="text-2xl font-bold dark:text-white mb-2">${t(
        'step2.options.title'
      )}</h2>
      <div class="mb-6">
        <label id="resize-label" for="resize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${t(
          'step2.options.resize.label'
        )}</label>
        <input value="${resizeWidth}" min="100" max="1000" type="number" id="resize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <ul class="w-full my-4 space-y-1 text-sm text-gray-500 list-disc list-inside dark:text-gray-400">
          <li id="caution1">${t('step2.options.resize.caution.1')}</li>
        </ul>
      </div>
      <label for="speed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${t(
        'step2.options.speed.title'
      )}</label>
      <select id="speed" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option id="fast" value="0.5">${t(
            'step2.options.speed.value.0.5'
          )}</option>
          <option id="default" value="1" selected>${t(
            'step2.options.speed.value.1'
          )}</option>
          <option id="slow" value="2">${t(
            'step2.options.speed.value.2'
          )}</option>
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
    let value = (e.target as HTMLInputElement).value
    if (Number(value) > 1000) {
      value = '1000'
    }
    if (Number(value) < 100) {
      value = '100'
    }
    ;(e.target as HTMLInputElement).value = value
    this.props.updateRef({
      resizeWidth: value,
    })
  }

  handleSpeedChange(e: Event) {
    this.props.updateRef({
      speed: Number((e.target as HTMLSelectElement).value),
    })
  }
}
