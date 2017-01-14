let AsyncStorage = global.AsyncStorage

if (!AsyncStorage) {
  if (!window.localStorage) throw new Error("No LocalStorage available.")
  AsyncStorage = {
    setItem: (key, val)=> Promise.resolve(window.localStorage.setItem(key, val)),
    getItem: (key)=> Promise.resolve(window.localStorage.getItem(key)),
    removeItem: (key)=> Promise.resolve(window.localStorage.removeItem(key)),
    key: (key)=> Promise.resolve(window.localStorage.key(key)),
    clear: (key)=> Promise.resolve(window.localStorage.clear())
  }
}

export default AsyncStorage