export default class Component {
  constructor(protected $target: Element, private state?: any) {
    this.$target = $target
    this.setup()
    this.render()
  }
  setup() {}
  template() {
    return ''
  }
  render() {
    this.$target.innerHTML = this.template()
    this.setEvent()
  }
  setEvent() {}
  setState(newState: any) {
    this.state = { ...this.state, ...newState }
    this.render()
  }
}
