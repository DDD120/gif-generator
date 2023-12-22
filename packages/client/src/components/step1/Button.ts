import Component from '../../core/Component'

export default class Button extends Component {
  template() {
    return `
      <button id="step1-button" type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">완료</button>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#step1-button')!
      .addEventListener('click', this.handleClick)
  }

  async handleClick() {}

  async createScreenshots() {}
}
