import Component from '../../core/Component'
import { getDuration } from '../../utils'
import { Step1State } from './Step1'

interface Props {
  startTime: string
  endTime: string
  updateState: (state: Partial<Step1State>) => void
}

export default class TimeInput extends Component<Props> {
  template() {
    const { startTime, endTime } = this.props

    return `
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="start-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">시작 시각</label>
          <input placeholder="HH:MM:SS" value="${startTime}" type="text" id="start-time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
          <label for="end-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">종료 시각</label>
          <input placeholder="HH:MM:SS" value="${endTime}" type="text" id="end-time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
      </div>
      <ul class="max-w-md my-4 space-y-1 text-sm text-gray-500 list-disc list-inside dark:text-gray-400">
        <li>형식에 맞게 입력해 주세요. 예) 1초 -> 00:00:01</li>
        <li>시작 시각과 종료 시각 사이는 최대 3초입니다.</li>
      </ul>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#start-time')!
      .addEventListener('change', this.handleStartTimeChange.bind(this))
    this.$target
      .querySelector('#end-time')!
      .addEventListener('change', this.handleEndTimeChange.bind(this))
  }

  handleStartTimeChange(e: Event) {
    const { endTime, updateState } = this.props
    const newStartTime = (e.target as HTMLInputElement).value
    const isRequired =
      !!endTime && /[0-9][0-9]:[0-5][0-9]:[0-5][0-9]/.test(newStartTime)

    updateState({ isRequired, startTime: newStartTime })
    if (isRequired) {
      const duration = getDuration(newStartTime, endTime)
      if (duration < 0 || duration > 3) updateState({ isRequired: false })
    }
  }

  handleEndTimeChange(e: Event) {
    const { startTime, updateState } = this.props
    const newEndTime = (e.target as HTMLInputElement).value
    const isRequired =
      !!startTime && /[0-9][0-9]:[0-5][0-9]:[0-5][0-9]/.test(newEndTime)

    updateState({ isRequired, endTime: newEndTime })
    if (isRequired) {
      const duration = getDuration(startTime, newEndTime)
      if (duration < 0 || duration > 3) updateState({ isRequired: false })
    }
  }
}
