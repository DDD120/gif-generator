import Layout from './components/Layout.ts'

class App {
  constructor() {
    const $app = document.querySelector('#app')!
    new Layout($app, {
      insert: 'inner',
    })
  }
}

new App()
