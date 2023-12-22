import Component from '../../core/Component'
import Stepper from '../Stepper'
import Button from './Button'
import TimeInput from './TimeInput'
import VideoInput from './VideoInput'

export default class Step1 extends Component {
  setup() {
    this.state = {
      ...this.state,
    }
  }

  template() {
    return `
      <div id="stepper" class="mb-8"></div>
      <section class="w-full flex justify-center items-center">
        <div id="step1-form" class="w-full">
        </div>
      </section>
    `
  }
  mounted() {
    const $stepper = document.querySelector('#stepper')!
    const $form = document.querySelector('#step1-form')!

    new Stepper($stepper, { insert: 'inner' })
    new VideoInput($form, { insert: 'append' })
    new TimeInput($form, { insert: 'append' })
    new Button($form, { insert: 'append' })
  }
}
