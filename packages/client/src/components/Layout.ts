import Component from '../core/Component'

export default class Layout extends Component {
  template(): string {
    return `
          <div class="flex flex-col items-center justify-center py-8">
            <h1 class="text-3xl font-extrabold dark:text-white">움짤 생성기</h1>
            <main
              id="container"
              class="mt-8 max-w-[640px] w-[90%] flex flex-col justify-center items-center"
            ></main>
          </div>
        `
  }
}
