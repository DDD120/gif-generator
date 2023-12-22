export default class Component {
  constructor(
    protected $target: Element,
    protected state?: any,
    protected props?: any
  ) {
    this.$target = $target
    this.setup()
    this.render()
  }
  setup() {}
  mounted() {}
  template() {
    return ''
  }
  render() {
    this.$target.innerHTML = this.template()
    this.setEvent()
    this.mounted()
  }
  setEvent() {}
  setState(newState: any) {
    this.state = { ...this.state, ...newState }
    this.render()
  }
}
