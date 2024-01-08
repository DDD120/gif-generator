import Component from '../../core/Component'

interface Props {
  percent: string
}

export default class Progress extends Component<Props> {
  template() {
    const { percent } = this.props

    return `
      <div class="w-full">
        <div class="flex justify-between mb-1">
          <span class="text-base font-medium text-blue-700 dark:text-white">Generating...</span>
          <span class="text text-sm font-medium text-blue-700 dark:text-white">${percent}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div class="fill w-[${percent}%] bg-blue-600 h-2.5 rounded-full transition-[width]"></div>
        </div>
      <div>
    `
  }
}
