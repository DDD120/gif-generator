type ObserverFunction = () => void

interface ObservableObject {
  [key: string]: any
}

let currentObserver: ObserverFunction | null = null

export const observe = (fn: ObserverFunction) => {
  currentObserver = fn
  fn()
  currentObserver = null
}

export const observable = (obj: ObservableObject) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key]
    const observers = new Set<ObserverFunction>()

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver)
        return _value
      },

      set(value) {
        console.log('set')
        _value = value
        observers.forEach((fn) => fn())
      },
    })
  })
  return obj
}
