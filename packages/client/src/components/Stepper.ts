import Component from '../core/Component'
import { store } from '../store/store'

export default class Stepper extends Component {
  template() {
    return `
    <ol class="flex-wrap gap-2 flex justify-center items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <li class="flex justify-center items-center ${
          store.state.step === 1 && 'text-blue-600 dark:text-blue-500'
        }">
            <div class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0  ${
              store.state.step === 1
                ? 'dark:border-blue-500 border-blue-600'
                : 'border-gray-500 dark:border-gray-400'
            }">
                <p class="translate-y-[0.8px]">1</p>
            </div>
            <p>영상 정보 입력</p>
            <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>
        <li class="flex items-center ${
          store.state.step === 2 && 'text-blue-600 dark:text-blue-500'
        }">
            <div class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0  ${
              store.state.step === 2
                ? 'dark:border-blue-500 border-blue-600'
                : 'border-gray-500 dark:border-gray-400'
            }">
                <p class="translate-y-[0.8px]">2</p>
            </div>
            <p>자르기 및 옵션 설정</p>
            <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>
        <li class="flex items-center ${
          store.state.step === 3 && 'text-blue-600 dark:text-blue-500'
        }">
            <div class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0  ${
              store.state.step === 3
                ? 'dark:border-blue-500 border-blue-600'
                : 'border-gray-500 dark:border-gray-400'
            }">
                <p class="translate-y-[0.8px]">3</p>
            </div>
            <p>생성 및 다운로드</p>
        </li>
    </ol>
  `
  }
}
