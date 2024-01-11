import { observable } from '../core/observer.ts'

interface State {
  [key: string]: any
  step: number
  requestUrl: string
  id: string
  startTime: string
  duration: number
  screenshot: string
  imgSrc: string
}

export const store = {
  state: observable<State>({
    step: 1,
    requestUrl: '',
    id: '0c21cec7-0b11-4a11-ae84-6403d42ba159',
    startTime: '',
    duration: 0,
    screenshot: '',
    imgSrc: '',
  }),

  setState(newState: Partial<State>) {
    for (let key in newState) {
      this.state[key] = newState[key]
    }
  },
}
