export const debounce = (
  // the function to debounce
  fn: (...args: any[]) => any,

  // the time in milliseconds to debounce by
  ms = 0,

  // invert call order, true will cause fn to be called with the
  // most recent provided set of args, false will cause fn to be
  // called with the first set of args of the debounce stack
  inverted = false
) => {
  let handle

  // return a function that returns a promise of the values from
  // it's eventual execution once ms has elapsed
  return (...args) => new Promise(res => {

    // if handle is undefined, we're not currently debouncing
    // so create a debounced call to fn with provided args
    if (typeof handle === 'undefined') {
      handle = setTimeout(() => {

        // call fn with provided args
        const value = fn(...args)

        // reset the handle so fn can be called again
        clearTimeout(handle)
        handle = undefined

        // resolve promise with value from fn
        res(value)
      }, ms)

    // if handle is defined but we're not in inverted (first-call) mode,
    // clear the handle so we can replace the previous call with the latest one
    } else if (!inverted) {
      clearTimeout(handle)
      handle = undefined
    }
  })
}

export default debounce
if (window) {
  window.debounce = debounce 
}
