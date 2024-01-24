import Component from '../../core/Component'
import { observe } from '../../core/observer'
import { store } from '../../store/store'
import Darkmode from './Darkmode'
import Step1 from '../step1/Step1'
import Step2 from '../step2/Step2'
import Step3 from '../step3/Step3'
import { t } from '../../language/index'
import LanguageSelector from './LanguageSelector'

export default class Layout extends Component {
  template(): string {
    return `
          <div class="flex flex-col items-center justify-center py-8">
            <header>
              <h1 id="title" class="mt-20 text-3xl font-extrabold dark:text-white">${t(
                'title'
              )}</h1>
              <div class="fixed top-2 right-2 flex gap-2">
                <div id="darkmode"></div>
                <div id="language"></div>
              </div>
            </header>
            <main
              id="container"
              class="mt-8 max-w-[640px] w-[90%] flex flex-col justify-center items-center"
            ></main>
            <div id="toast" class="w-full flex items-center justify-center fixed top-5 left-1/2 -translate-x-1/2"></div>
          </div>
        `
  }
  mounted() {
    const $container = this.$target.querySelector(
      '#container'
    ) as HTMLDivElement
    const $darkmode = this.$target.querySelector('#darkmode') as HTMLDivElement
    const $language = this.$target.querySelector('#language') as HTMLDivElement
    new Darkmode($darkmode, {})
    new LanguageSelector($language, {})

    observe(() => {
      if (store.state.step === 1) {
        new Step1($container, {})
      } else if (store.state.step === 2) {
        new Step2($container, {})
      } else {
        new Step3($container, {})
      }
    })
  }
}