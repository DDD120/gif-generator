import Layout from './components/layout/Layout.ts'
import './language/index.ts'

class App {
  constructor() {
    const $app = document.querySelector('#app')!
    new Layout($app, {})
  }
}

new App()
