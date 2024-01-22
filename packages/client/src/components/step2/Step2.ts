import Component from '../../core/Component'
import Stepper from '../Stepper'
import Button from './Button'
import Crop from './Crop'
import Options from './Options'
import Progress from './Progress'
import { store } from '../../store/store'

export interface Step2State {
  loading: boolean
}

export interface CropData {
  x: number
  y: number
  width: number
  height: number
}

export interface Step2Ref {
  resizeWidth: string
  speed: number
  wsClientId: string
  socket: WebSocket
  cropData: CropData | undefined
  frame: string
}

export default class Step2 extends Component<{}, Step2State, Step2Ref> {
  setup() {
    this.state = {
      loading: false,
    }
    this.ref = {
      wsClientId: '',
      socket: new WebSocket('ws://localhost:4000'),
      resizeWidth: '500',
      speed: 1,
      cropData: undefined,
      frame: '0',
    }
  }

  setEvent() {
    const { socket } = this.ref
    socket.addEventListener('message', this.onMessage.bind(this))
  }

  onMessage(event: MessageEvent) {
    const { wsClientId } = this.ref
    if (!wsClientId) this.updateRef({ wsClientId: event.data })
    else this.updateRef({ frame: event.data })
  }

  template() {
    return `
      <div id="stepper" class="mb-8"></div>
      <section id="step2-wrapper" class="w-full flex justify-center items-center">
        <div id="step2-container" class="w-full">
          <div id="crop"></div>
          <hr class="my-2 h-[2px] rounded-sm border-none bg-gray-300 dark:bg-gray-600" />
          <div id="options"></div>
          <div id="button"></div>
        </div>
      </section>
    `
  }

  mounted() {
    const $stepper = this.$target.querySelector('#stepper')!
    const $container = this.$target.querySelector('#step2-container')!
    const $crop = $container.querySelector('#crop')!
    const $options = $container.querySelector('#options')!
    const $button = $container.querySelector('#button')!
    const { loading } = this.state

    if (loading) {
      new Progress($container, {})
    } else {
      new Stepper($stepper, {})
      new Crop($crop, {
        updateRef: this.updateRef.bind(this),
      })
      new Options($options, {
        ref: this.ref,
        updateRef: this.updateRef.bind(this),
      })
      new Button($button, {
        step2: this,
        updateState: this.updateState.bind(this),
      })
    }
  }

  updateState(state: Partial<Step2State>) {
    this.setState(state)
  }

  updateRef(ref: Partial<Step2Ref>) {
    this.setRef(ref)
    if (ref.frame) this.updateProgress()
  }

  updateProgress() {
    const percent = this.setPercent(this.ref.frame)
    const $text = this.$target.querySelector('.text') as HTMLDivElement
    const $fill = this.$target.querySelector('.fill') as HTMLDivElement
    $text.textContent = percent + '%'
    $fill.style.width = percent + '%'
  }

  setPercent(frame: string) {
    const { duration } = store.state
    const { speed } = this.ref
    const percent = (
      ((Number(frame) / (30 * (duration ?? 1))) * 100) /
      speed
    ).toFixed(0)
    return percent
  }
}
