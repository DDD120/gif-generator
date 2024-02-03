import i18next from 'i18next'
import ko from './ko.json'
import en from './en.json'
import {
  changeStep1Lang,
  changeStep2Lang,
  changeStep3Lang,
  changeStepperLang,
} from './changeLang'
import { store } from '../store/store'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ko'
    resources: {
      ko: typeof ko
      en: typeof en
    }
  }
}

const lng = localStorage.getItem('lang') ?? 'ko'

i18next.init({
  lng,
  debug: true,
  resources: {
    ko: {
      translation: ko,
    },
    en: {
      translation: en,
    },
  },
})

i18next.on('languageChanged', () => {
  document.getElementById('title')!.textContent = i18next.t('title')
  document.title = i18next.t('title')
  changeStepperLang()

  const { step } = store.state
  switch (step) {
    case 1:
      changeStep1Lang()
      break
    case 2:
      changeStep2Lang()
      break
    case 3:
      changeStep3Lang()
      break
  }
})

export default i18next

export const t = i18next.t
