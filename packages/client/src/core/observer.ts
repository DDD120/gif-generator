type ObserverFunction = () => void

let currentObserver: ObserverFunction | null = null

const debounceFrame = (callback: ObserverFunction) => {
  let currentCallback = -1
  return () => {
    cancelAnimationFrame(currentCallback)
    currentCallback = requestAnimationFrame(callback)
  }
}

export const observe = (fn: ObserverFunction) => {
  currentObserver = debounceFrame(fn)
  fn()
  currentObserver = null
}

export const observable = <T>(obj: T) => {
  Object.keys(obj as object).forEach((key) => {
    let _value = obj[key as keyof T]
    const observers = new Set<ObserverFunction>()

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver)
        return _value
      },

      set(value) {
        if (_value === value) return
        if (JSON.stringify(_value) === JSON.stringify(value)) return
        _value = value
        observers.forEach((fn) => fn())
      },
    })
  })
  return obj
}
