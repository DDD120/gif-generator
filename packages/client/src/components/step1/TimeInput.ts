import Component from '../../core/Component'

interface TimeInputState {
  $startTime?: HTMLInputElement
  $endTime?: HTMLInputElement
  updateState: (state: { [key: string]: any }) => void
}

export default class TimeInput extends Component<TimeInputState> {
  mounted() {
    const $startTime = document.querySelector('#start-time') as HTMLInputElement
    const $endTime = document.querySelector('#end-time') as HTMLInputElement
    this.setState({ $startTime, $endTime })
    this.state.updateState({
      startTime: $startTime.value,
      endTime: $endTime.value,
    })
  }

  template() {
    return `
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="start-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">시작 시간</label>
          <input placeholder="00:00" value="00:00:02" type="text" id="start-time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]" required>
        </div>
        <div>
          <label for="end-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">종료 시간</label>
          <input placeholder="00:00" value="00:00:03" type="text" id="end-time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required>
        </div>
      </div>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#start-time')
      ?.addEventListener('change', this.handleChange.bind(this))
    this.$target
      .querySelector('#end-time')
      ?.addEventListener('change', this.handleChange.bind(this))
  }

  handleChange(e: Event) {
    const { $startTime, $endTime } = this.state
    if ((e.target as HTMLInputElement).id === 'start-time') {
      this.state.this.state.updateState({
        startTime: $startTime?.value,
      })
    } else {
      this.state.updateState({ endTime: $endTime?.value })
    }
  }
}
