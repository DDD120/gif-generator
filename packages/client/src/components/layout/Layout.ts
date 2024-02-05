import Component from '../../core/Component'
import { observe } from '../../core/observer'
import { store } from '../../store/store'
import Darkmode from './Darkmode'
import Step1 from '../step1/Step1'
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
              <div class="absolute top-2 right-2 flex gap-2">
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

    observe(async () => {
      if (store.state.step === 1) {
        new Step1($container, {})
      } else if (store.state.step === 2) {
        const { default: Step2 } = await import('../step2/Step2')
        new Step2($container, {})
      } else {
        const { default: Step3 } = await import('../step3/Step3')
        new Step3($container, {})
      }
    })
  }
}
