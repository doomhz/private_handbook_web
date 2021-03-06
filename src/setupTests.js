let localStorageMock = (function() {
  let store = {}
  return {
    getItem: function(key) {
      return store[key]
    },
    key: function(key) {
      return store[key]
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      return true
    },
    clear: function() {
      store = {}
    }
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })