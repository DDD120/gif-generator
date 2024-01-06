import { observable } from '../core/observer.ts'

export const store = {
  state: observable({
    step: 1,
    url: '',
    id: '0c21cec7-0b11-4a11-ae84-6403d42ba159',
    startTime: '',
    duration: 0,
    screenshot: '',
  }),

  setState(newState: { [key: string]: any }) {
    for (let key in newState) {
      this.state[key] = newState[key]
    }
  },
}
