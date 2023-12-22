import Component from '../../core/Component'
import Stepper from '../Stepper'

export default class Step1 extends Component {
  template() {
    return `
      <div id="stepper" class="mb-8"></div>
    `
  }
  mounted() {
    const $stepper = document.querySelector('#stepper')!
    new Stepper($stepper)
  }
}
