import Component from '../../core/Component'
import Stepper from '../Stepper'
import Button from './Button'
import Crop from './Crop'
import Options from './Options'

export default class Step2 extends Component {
  template() {
    return `
      <div id="stepper" class="mb-8"></div>
      <section id="step2-wrapper" class="w-full flex justify-center items-center">
        <div id="step2-container" class="w-full"></div>
      </section>
    `
  }

  mounted() {
    const $stepper = this.$target.querySelector('#stepper')!
    const $container = this.$target.querySelector('#step2-container')!

    new Stepper($stepper, { insert: 'inner' })
    new Crop($container, { insert: 'append' })
    new Options($container, { insert: 'append' })
    new Button($container, { insert: 'append' })
  }
}
