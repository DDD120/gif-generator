import { store } from './store/store.ts'
import Layout from './components/Layout.ts'
import Step1 from './components/step1/Step1.ts'
import Step2 from './components/step2/Step2.ts'
import Step3 from './components/step3/Step3.ts'
import { observe } from './core/observer.ts'

class App {
  constructor() {
    const $app = document.querySelector('#app')!
    new Layout($app)
    const $container = document.querySelector('#container')!
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

new App()
