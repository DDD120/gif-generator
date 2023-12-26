import { observable } from '../core/observer.ts'

export const store = {
  state: observable({
    step: 1,
    url: '',
    id: '',
    state: '',
    startTime: '',
    duration: 0,
    screenshot: '',
  }),

  setState(newState: { [key: string]: any }) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue
      this.state[key] = value
    }
  },
}
