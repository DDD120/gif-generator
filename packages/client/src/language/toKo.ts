import { t } from './index'

export function stepperToKo() {
  const $target = document.getElementById('stepper')!

  $target.querySelector('#step1')!.textContent = t('stepper.1')
  $target.querySelector('#step2')!.textContent = t('stepper.2')
  $target.querySelector('#step3')!.textContent = t('stepper.3')
}

export function step1ToKo() {
  const $target = document.getElementById('step1-wrapper') as HTMLElement

  ;($target.querySelector('#video-url') as HTMLInputElement).placeholder = t(
    'step1.requestTypeInput.placeholder'
  )
  $target.querySelector('#start-time-label')!.textContent = t(
    'step1.timeInput.startTimeLabel'
  )
  $target.querySelector('#end-time-label')!.textContent = t(
    'step1.timeInput.endTimeLabel'
  )
  $target.querySelector('#caution1')!.textContent = t(
    'step1.timeInput.caution.1'
  )
  $target.querySelector('#caution2')!.textContent = t(
    'step1.timeInput.caution.2'
  )
  $target.querySelector('#step1-button')!.textContent = t('step1.button')
}
