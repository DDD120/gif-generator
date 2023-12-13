export default class Step3 {
  target: HTMLDivElement
  url: string | undefined

  constructor(target: HTMLDivElement) {
    this.target = target
  }

  insert(url: string) {
    this.url = url
    this.render()
  }

  render() {
    this.target.innerHTML = `
     <div class="flex flex-col gap-4">
      <image src=${this.url}  />
      <div>
      <div>
          <label for="gif-download-filename" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">저장명</label>
          <input type="text" id="gif-download-filename" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="generated" required>
        </div>
        <div class="mt-4">
            <a href=${this.url} download="generated" class="download flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">다운로드</a>
        </div>
     </div>
    `
    const $download = document.querySelector('.download') as HTMLAnchorElement
    const $input = document.getElementById(
      'gif-download-filename'
    ) as HTMLInputElement
    $input.addEventListener('change', () => {
      $download.setAttribute('download', $input.value)
    })
  }
}
