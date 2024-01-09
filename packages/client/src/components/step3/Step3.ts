import Component from '../../core/Component'
import { store } from '../../store/store'
import Stepper from '../Stepper'

interface State {
  filename: string
}

export default class Step3 extends Component<{}, State> {
  setup() {
    this.state = {
      filename: '',
    }
  }

  template() {
    const { filename } = this.state
    const { imgSrc } = store.state
    const download = filename === '' ? 'download' : filename

    return `
      <div id="stepper" class="mb-8"></div>
      <main class="flex flex-col gap-4 w-full">
        <img src=${imgSrc} alt="생성된 움짤" />
        <div>
          <label for="gif-download-filename" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">저장명</label>
          <input type="text" value="${filename}" id="gif-download-filename" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="download" required />
        </div>
        <div class="mt-4">
          <a href=${imgSrc} id="download" download=${download} class="flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">다운로드</a>
        </div>
      </main>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#gif-download-filename')!
      .addEventListener('change', this.handleFilenameChange.bind(this))
  }

  mounted() {
    const $stepper = document.querySelector('#stepper')!
    new Stepper($stepper, {
      insert: 'inner',
    })
  }

  handleFilenameChange(e: Event) {
    this.setState({ filename: (e.target as HTMLInputElement).value })
  }
}
