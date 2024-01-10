import Component from '../../core/Component'
import { Step1State } from './Step1'

interface Props {
  requestUrl: string
  currentType: 'url' | 'file'
  updateState: (state: Partial<Step1State>) => void
}

export default class RequestTypeInput extends Component<Props> {
  template() {
    const { requestUrl, currentType } = this.props

    return `
      <fieldset id="video-radio" class="flex gap-2 mb-4">
        <div class="flex-1 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
        <input ${
          currentType === 'url' && 'checked'
        } id="video-url-radio" type="radio" value="video-url-radio" name="video" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="video-url-radio" class="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">영상 URL</label>
        </div>
        <div class="flex-1 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input  ${
              currentType === 'file' && 'checked'
            } id="file-upload-radio" type="radio" value="file-upload-radio" name="video" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="file-upload-radio" class="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">파일 업로드</label>
        </div>
      </fieldset>
      <div class="mb-6">
        ${
          currentType === 'url'
            ? `<input id='video-url' value="${requestUrl}" type='text' class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>`
            : "<input id='file-upload' accept='video/mp4,video/x-m4v,video/*' class='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' type='file' />"
        }
      </div>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#video-radio')!
      .addEventListener('change', this.handleTypeChange.bind(this))
    this.$target
      .querySelector('#video-url')
      ?.addEventListener('change', this.handleUrlChange.bind(this))
  }

  handleTypeChange() {
    const type = this.props.currentType === 'url' ? 'file' : 'url'
    this.props.updateState({ currentType: type })
  }

  handleUrlChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.props.updateState({ requestUrl: input.value })
  }
}
