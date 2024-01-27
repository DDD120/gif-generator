import { t } from './index'

export function changeStepperLang() {
  const $target = document.getElementById('stepper')!

  $target.querySelector('#step1')!.textContent = t('stepper.1')
  $target.querySelector('#step2')!.textContent = t('stepper.2')
  $target.querySelector('#step3')!.textContent = t('stepper.3')
}

export function changeStep1Lang() {
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

export function changeStep2Lang() {
  const $target = document.getElementById('step2-wrapper') as HTMLElement

  $target.querySelector('#cropTitle')!.textContent = t('step2.crop.title')
  ;($target.querySelector('#img') as HTMLImageElement).alt =
    t('step2.crop.imgAlt')
  $target.querySelector('#optionsTitle')!.textContent = t('step2.options.title')
  $target.querySelector('#resizeLabel')!.textContent = t(
    'step2.options.resize.label'
  )
  $target.querySelector('#caution1')!.textContent = t(
    'step2.options.resize.caution.1'
  )
  $target.querySelector('#fast')!.textContent = t(
    'step2.options.speed.value.0.5'
  )
  $target.querySelector('#default')!.textContent = t(
    'step2.options.speed.value.1'
  )
  $target.querySelector('#slow')!.textContent = t('step2.options.speed.value.2')
  $target.querySelector('#step-button')!.textContent = t('step2.button')
  $target.querySelector('#progress')!.textContent = t('step2.progress')
}
