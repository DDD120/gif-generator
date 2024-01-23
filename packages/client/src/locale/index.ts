import i18next from 'i18next'
import ko from './ko.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ko'
    resources: {
      ko: typeof ko
    }
  }
}

i18next.init({
  lng: 'ko',
  debug: true,
  resources: {
    ko: {
      translation: ko,
    },
  },
})

export default i18next

export const t = i18next.t
