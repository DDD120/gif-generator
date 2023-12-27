import Component from '../../core/Component'
import Stepper from '../Stepper'
import Button from './Button'
import Loading from './Loading'
import TimeInput from './TimeInput'
import VideoInput from './VideoInput'

export interface Step1State {
  url: string
  startTime: string
  endTime: string
  loading: boolean
}

export default class Step1 extends Component<{}, Step1State> {
  setup() {
    this.state = {
      url: './video/abc.mp4',
      startTime: '00:00:01',
      endTime: '00:00:02',
      loading: false,
    }
  }

  template() {
    return `
      <div id="stepper" class="mb-8"></div>
      <section id="step1-wrapper" class="w-full flex justify-center items-center">
        <div id="step1-form" class="w-full"></div>
      </section>
    `
  }

  mounted() {
    const $wrapper = this.$target.querySelector('#step1-wrapper')!
    const $stepper = this.$target.querySelector('#stepper')!
    const $form = this.$target.querySelector('#step1-form')!
    const { url, startTime, endTime, loading } = this.state

    if (loading) {
      new Loading($wrapper, {
        insert: 'inner',
      })
    } else {
      new Stepper($stepper, { insert: 'inner' })
      new VideoInput($form, {
        insert: 'append',
        url,
        updateState: this.updateState.bind(this),
      })
      new TimeInput($form, {
        insert: 'append',
        startTime,
        endTime,
        updateState: this.updateState.bind(this),
      })
      new Button($form, {
        insert: 'append',
        url,
        startTime,
        endTime,
        updateState: this.updateState.bind(this),
      })
    }
  }

  updateState(state: Partial<Step1State>) {
    this.setState(state)
  }
}
