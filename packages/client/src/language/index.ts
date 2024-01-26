import i18next from 'i18next'
import ko from './ko.json'
import en from './en.json'
import { step1ToKo, stepperToKo } from './toKo'

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
  stepperToKo()
  step1ToKo()
})

export default i18next

export const t = i18next.t
