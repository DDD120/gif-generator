import Component from '../../core/Component'
import Stepper from '../Stepper'
import Button from './Button'
import Loading from './Loading'
import TimeInput from './TimeInput'
import RequestTypeInput from './RequestTypeInput'

export interface Step1State {
  requestUrl: string
  currentType: 'url' | 'file'
  startTime: string
  endTime: string
  loading: boolean
  isRequired: boolean
}

export default class Step1 extends Component<{}, Step1State> {
  setup() {
    this.state = {
      requestUrl: '',
      currentType: 'url',
      startTime: '',
      endTime: '',
      loading: false,
      isRequired: false,
    }
  }

  template() {
    return `
      <div id="stepper" class="mb-8"></div>
      <section id="step1-wrapper" class="w-full flex justify-center items-center">
        <div id="request-form" class="w-full">
          <div id="request-type-input"></div>
          <div id="time-input"></div>
          <div id="button-wrapper"></div>
        </div>
      </section>
    `
  }

  mounted() {
    const $stepper = this.$target.querySelector('#stepper')!
    const $wrapper = this.$target.querySelector('#step1-wrapper')!
    const $requestTypeInput = $wrapper.querySelector('#request-type-input')!
    const $timeInput = $wrapper.querySelector('#time-input')!
    const $buttonWrapper = $wrapper.querySelector('#button-wrapper')!
    const { requestUrl, currentType, loading, startTime, endTime, isRequired } =
      this.state

    if (loading) {
      new Loading($wrapper, {})
    } else {
      new Stepper($stepper, {})
      new RequestTypeInput($requestTypeInput, {
        requestUrl,
        currentType,
        updateState: this.updateState.bind(this),
      })
      new TimeInput($timeInput, {
        startTime,
        endTime,
        updateState: this.updateState.bind(this),
      })
      new Button($buttonWrapper, {
        requestUrl,
        startTime,
        endTime,
        isRequired,
        updateState: this.updateState.bind(this),
      })
    }
  }

  updateState(state: Partial<Step1State>) {
    this.setState(state)
  }
}
