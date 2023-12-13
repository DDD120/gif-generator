import Step1 from './step1.ts'
import Step2 from './step2.ts'
import Step3 from './step3.ts'

const socket = new WebSocket('ws://localhost:4000')
const $stepBox = document.querySelector('.step-box')! as HTMLDivElement

const step1 = new Step1($stepBox)
const step2 = new Step2($stepBox)
const step3 = new Step3($stepBox)

let wsClientId = ''

socket.addEventListener('error', () => {
  console.log('error')
})

socket.addEventListener('message', (event) => {
  if (!wsClientId) wsClientId = event.data
  else step2.setProgressPercent(Number(event.data))
})

const $getScreenshot = document.querySelector('.get-screenshot')
$getScreenshot?.addEventListener('click', async () => {
  const res = await step1.onButtonClick()
  if (res.state === 'success') {
    const { imageSrc, id, startTime, duration, url } = res
    step1.delete()
    step2.insert({ imageSrc, id, startTime, duration, url, wsClientId })
    const $createGIF = document.querySelector('.create-gif')
    $createGIF?.addEventListener('click', async () => {
      const res = await step2.onButtonClick()
      if (res.state === 'success') {
        console.log(res.url)
        step2.delete()
        step3.insert(res.url)
      }
    })
  }
})
