import Component from '../../core/Component'
import i18next, { t } from '../../language'

export default class LanguageSelector extends Component {
  template() {
    const lang = localStorage.getItem('lang') ?? 'ko'

    return `
      <label for="language-selector" class="sr-only">${t(
        'langSelection'
      )}</label>
      <select id="language-selector" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="ko" ${lang === 'ko' && 'selected'}>한국어</option>
        <option value="en" ${lang === 'en' && 'selected'}>English</option>
      </select>
    `
  }

  setEvent() {
    this.$target
      .querySelector('#language-selector')!
      .addEventListener('change', this.handleChange.bind(this))
  }

  handleChange(e: Event) {
    const lang = (e.target as HTMLSelectElement).value
    i18next.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }
}
