import Component from '../../core/Component'
import { t } from '../../language'

export default class Progress extends Component {
  template() {
    return `
      <div class="w-full">
        <div class="flex justify-between mb-1">
          <span id="progress" class="text-base font-medium text-blue-700 dark:text-white">${t(
            'step2.progress'
          )}</span>
          <span class="text text-sm font-medium text-blue-700 dark:text-white">0%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div  class="fill w-0 bg-blue-600 h-2.5 rounded-full transition-[width]"></div>
        </div>
      <div>
    `
  }
}
