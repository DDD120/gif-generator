import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import Component from '../../core/Component'
import { store } from '../../store/store'
import { Step2Ref, Step2State } from './Step2'

interface Props {
  updateState: (state: Partial<Step2State>) => void
  updateRef: (ref: Partial<Step2Ref>) => void
}

export default class Crop extends Component<Props> {
  mounted() {
    this.setCropper(this)
  }

  template() {
    return `
      <div class="w-full">
        <div class="my-4">
        <h2 class="text-2xl font-bold dark:text-white mb-2">자르기</h2>
        <div>
          <img id="img" src=${store.state.screenshot} alt="스크린샷" />
        </div>
      </div>
      <div class="my-4">
        <h3 class="text-xl font-bold dark:text-white mb-2">프리뷰</h3>
        <div id="preview" class="w-[420px] h-[420px] overflow-hidden bg-slate-400 [&>*]:w-full"></div>
      </div>
      <hr class="my-2" />
    `
  }

  setCropper(t: Crop) {
    const $img = this.$target.querySelector('#img') as HTMLImageElement
    const $preview = this.$target.querySelector('#preview') as HTMLDivElement
    new Cropper($img, {
      viewMode: 2,
      preview: $preview,
      background: false,
      zoomable: false,
      crop(e) {
        t.props.updateRef({ cropData: e.detail })
      },
    })
  }
}
