import Step1 from './step1.ts'
import Step2 from './step2.ts'
import Step3 from './step3.ts'

const socket = new WebSocket('ws://localhost:4000')
const $stepBox = document.querySelector('.step-box')! as HTMLDivElement

const step1 = new Step1($stepBox)
const step2 = new Step2($stepBox)
const step3 = new Step3($stepBox)

let wsClientId = ''

socket.addEventListener('message', (event) => {
  if (!wsClientId) wsClientId = event.data
  else step2.setProgressPercent(Number(event.data))
})

const $getScreenshot = document.querySelector('.get-screenshot')
$getScreenshot?.addEventListener('click', async () => {
  const res = await step1.onButtonClick()
  if (res.state === 'success') {
    successStep1(res)
  }
})

interface SuccessStep1Props {
  url: string
  id: any
  state: any
  startTime: string
  duration: number
  imageSrc: string
}

const successStep1 = (res: SuccessStep1Props) => {
  const { imageSrc, id, startTime, duration, url } = res
  step1.delete()
  step2.insert({ imageSrc, id, startTime, duration, url, wsClientId })
  const $createGIF = document.querySelector('.create-gif')
  $createGIF?.addEventListener('click', async () => {
    const res = await step2.onButtonClick()
    if (res.state === 'success') {
      successStep2(res.url)
    }
  })
}

const successStep2 = (url: string) => {
  step2.delete()
  step3.insert(url)
}
