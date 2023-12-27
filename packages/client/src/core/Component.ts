export interface Props {
  insert: 'inner' | 'append'
}

export default class Component<T = {}, S = {}> {
  protected state!: S

  constructor(protected $target: Element, protected props: Props & T) {
    this.setup()
    this.render()
    this.setEvent()
  }

  setup() {}

  mounted() {}
  template() {
    return ''
  }
  render() {
    if (this.props.insert === 'inner') {
      this.$target.innerHTML = this.template()
    } else if (this.props.insert === 'append') {
      const template = document.createElement('template')
      template.innerHTML = this.template()
      this.$target.appendChild(template.content)
    }

    this.mounted()
  }
  setEvent() {}
  setState(newState: any) {
    this.state = { ...this.state, ...newState }
    this.render()
  }
}
