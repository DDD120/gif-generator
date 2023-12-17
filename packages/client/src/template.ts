export const step1Template = `
  <div class="w-full">
  <div class="mb-6">
    <label for="video-url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비디오 URL</label>
    <input value="./video/abc.mp4" type="text" id="video-url" class="url-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
    <label for="start-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">시작 시간</label>
    <input placeholder="00:00" value="00:00:02" type="text" id="start-time" class="startTime bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]" required>
    </div>
    <div>
        <label for="end-time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">종료 시간</label>
        <input placeholder="00:00" value="00:00:03" type="text" id="end-time" class="endTime bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required>
    </div>
  </div>
  <button type="button" class="get-screenshot w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">완료</button>
  </div>
`

export const step2Template = (imageSrc: string) => `
<div>
  <div class="my-4">
    <h2 class="text-2xl font-bold dark:text-white mb-2">자르기</h2>
    <div>
      <img class="image" src=${imageSrc} alt="이미지" />
    </div>
  </div>
    <div class="my-4">
      <h3 class="text-xl font-bold dark:text-white mb-2">프리뷰</h3>
      <div class="preview w-[420px] h-[420px] overflow-hidden bg-slate-400 [&>*]:w-full"></div>
    </div>
    <hr />
    <div class="my-4">
      <h2 class="text-2xl font-bold dark:text-white mb-2">옵션</h2>
      <div class="mb-6">
        <label for="resize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">넓이 조절 (px 단위)</label>
        <input value="500" type="number" id="resize" class="resize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <label for="speed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">속도</label>
      <select id="speed" class="speed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="0.5">빠르게</option>
        <option value="1" selected>기본</option>
        <option value="2">느리게</option>
      </select>
    </div>
    <button type="button" class="create-gif w-full mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">완료</button>
</div>
`
export const step3Template = (url: string) => `
<div class="flex flex-col gap-4">
 <image src=${url}  />
 <div>
 <div>
     <label for="gif-download-filename" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">저장명</label>
     <input type="text" id="gif-download-filename" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="download" required>
   </div>
   <div class="mt-4">
       <a href=${url} download="download" class="download flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">다운로드</a>
   </div>
</div>
`

export const loadingTemplate = `
  <div role="status" class="mt-4">
  <span class="sr-only">Loading...</span>
  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
  </div>
`

export const progressTemplate = `
  <div class="w-full">
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-blue-700 dark:text-white">Generating...</span>
      <span class="text text-sm font-medium text-blue-700 dark:text-white">0%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div class="fill w-0 bg-blue-600 h-2.5 rounded-full transition-[width]"></div>
    </div>
  <div>
`
