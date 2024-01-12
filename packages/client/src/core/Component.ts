export default class Component<T = {}, S = {}, R = {}> {
  public state!: S
  public ref!: R

  constructor(protected $target: Element, public props: T) {
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
    this.mounted()
    this.setEvent()
  }
  setEvent() {}
  setState(newState: any) {
    this.state = { ...this.state, ...newState }
    this.render()
  }
  setRef(newRef: any) {
    this.ref = { ...this.ref, ...newRef }
  }
}
