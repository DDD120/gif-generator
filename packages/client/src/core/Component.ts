export interface State {
  insert: 'inner' | 'append'
  [key: string]: any
}

export default class Component<T = {}> {
  constructor(protected $target: Element, protected state: State & T) {
    this.setup()
    this.render()
  }
  setup() {}
  mounted() {}
  template() {
    return ''
  }
  render() {
    if (this.state.insert === 'inner') {
      this.$target.innerHTML = this.template()
    } else if (this.state.insert === 'append') {
      const template = document.createElement('template')
      template.innerHTML = this.template()
      this.$target.appendChild(template.content)
    }

    this.setEvent()
    this.mounted()
  }
  setEvent() {}
  setState(newState: any) {
    this.state = { ...this.state, ...newState }
  }
}
