import Component from '../core/Component'
import { observe } from '../core/observer'
import { store } from '../store/store'
import Step1 from './step1/Step1'
import Step2 from './step2/Step2'
import Step3 from './step3/Step3'

export default class Layout extends Component {
  template(): string {
    return `
          <div class="flex flex-col items-center justify-center py-8">
            <h1 class="text-3xl font-extrabold dark:text-white">움짤 생성기</h1>
            <main
              id="container"
              class="mt-8 max-w-[640px] w-[90%] flex flex-col justify-center items-center"
            ></main>
          </div>
        `
  }
  mounted() {
    const $container = document.querySelector('#container') as HTMLDivElement
    observe(() => {
      if (store.step === 1) {
        new Step1($container)
      } else if (store.step === 2) {
        new Step2($container)
      } else {
        new Step3($container)
      }
    })
  }
}
