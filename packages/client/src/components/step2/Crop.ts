import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import Component from '../../core/Component'
import { store } from '../../store/store'
import { Step2Ref } from './Step2'
import { t } from '../../language'

interface Props {
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
        <h2 id="cropTitle" class="text-2xl font-bold dark:text-white mb-2">${t(
          'step2.crop.title'
        )}</h2>
        <div>
        <img id="img" src="${store.state.screenshotSrc}" alt="${t(
      'step2.crop.imgAlt'
    )}" />
        </div>
      </div>
      <div class="my-4">
        <h3 id="previewTitle" class="text-xl font-bold dark:text-white mb-2">${t(
          'step2.crop.previewTitle'
        )}</h3>
        <div id="preview" class="w-[420px] h-[420px] overflow-hidden bg-slate-400 [&>*]:w-full"></div>
      </div>
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
        const { x, y, width, height } = e.detail
        t.props.updateRef({
          cropData: {
            x,
            y,
            width,
            height,
          },
        })
      },
    })
  }
}
