import Cropper from 'cropperjs'
import Component from '../../core/Component'
import Stepper from '../Stepper'
import Button from './Button'
import Crop from './Crop'
import Options from './Options'
import Progress from './Progress'

export interface Step2State {
  resizeWidth: string
  speed: string
  wsClientId: string
  socket: WebSocket
  loading: boolean
  percent: number
}

export interface Step2Ref {
  cropData: Cropper.Data | undefined
}

export default class Step2 extends Component<{}, Step2State, Step2Ref> {
  setup() {
    this.state = {
      resizeWidth: '500',
      speed: '1',
      wsClientId: '',
      socket: new WebSocket('ws://localhost:4000'),
      loading: false,
      percent: 0,
    }
    this.ref = {
      cropData: undefined,
    }
  }

  setEvent() {
    const { socket, wsClientId } = this.state
    socket.addEventListener('message', (event) => {
      if (!wsClientId) this.setState({ wsClientId: event.data })
    })
  }

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
    const { resizeWidth, speed, wsClientId, loading, percent } = this.state
    const { cropData } = this.ref

    if (loading) {
      new Progress($container, {
        insert: 'inner',
        percent: String(percent),
      })
    } else {
      new Stepper($stepper, { insert: 'inner' })
      new Crop($container, {
        insert: 'append',
        updateState: this.updateState.bind(this),
        updateRef: this.updateRef.bind(this),
      })
      new Options($container, {
        insert: 'append',
        resizeWidth: this.state.resizeWidth,
        updateState: this.updateState.bind(this),
      })
      new Button($container, {
        insert: 'append',
        cropData,
        resizeWidth,
        speed,
        wsClientId,
        updateState: this.updateState.bind(this),
      })
    }
  }

  updateState(state: Partial<Step2State>) {
    this.setState(state)
  }

  updateRef(ref: Partial<Step2Ref>) {
    this.setRef(ref)
  }
}
