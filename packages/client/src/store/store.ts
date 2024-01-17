import { observable } from '../core/observer.ts'

interface State {
  [key: string]: any
  step: number
  requestUrl: string
  id: string
  startTime: string
  duration: number
  screenshotSrc: string
  gifSrc: string
}

export const store = {
  state: observable<State>({
    step: 1,
    requestUrl: '',
    id: '',
    startTime: '',
    duration: 0,
    screenshotSrc: '',
    gifSrc: '',
  }),

  setState(newState: Partial<State>) {
    for (let key in newState) {
      this.state[key] = newState[key]
    }
  },

  reset() {
    this.setState({
      step: 1,
      requestUrl: '',
      id: '',
      startTime: '',
      duration: 0,
      screenshotSrc: '',
      gifSrc: '',
    })
  },
}
