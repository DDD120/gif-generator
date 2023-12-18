import Step1 from './step1.ts'
import Step2 from './step2.ts'
import Step3 from './step3.ts'

const target = document.querySelector('.step-box')! as HTMLDivElement
const step1 = new Step1(target)
const step2 = new Step2(target)
const step3 = new Step3(target)

const socket = new WebSocket('ws://localhost:4000')
let wsClientId = ''

socket.addEventListener('message', (event) => {
  if (!wsClientId) wsClientId = event.data
  else step2.setProgressPercent(Number(event.data))
})

const successStep1 = (res: SuccessStep1Props) => {
  const { imageSrc, id, startTime, duration, url } = res
  step1.delete()
  step2.insert({ imageSrc, id, startTime, duration, url, wsClientId })
  const Step2Button = document.getElementById('step2-button')!
  Step2Button.addEventListener('click', handleStep2ButtonClick)
}

const handleStep1ButtonClick = async () => {
  const res = await step1.onButtonClick()
  if (res.state === 'success') {
    successStep1(res)
  }
}

const successStep2 = (url: string) => {
  step2.delete()
  step3.insert(url)
}

const handleStep2ButtonClick = async () => {
  const res = await step2.onButtonClick()
  if (res.state === 'success') {
    successStep2(res.url)
  }
}

const Step1Button = document.getElementById('step1-button')!
Step1Button.addEventListener('click', handleStep1ButtonClick)

interface SuccessStep1Props {
  url: string
  id: any
  state: any
  startTime: string
  duration: number
  imageSrc: string
}
