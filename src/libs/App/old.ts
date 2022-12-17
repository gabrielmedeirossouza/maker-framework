export function App(anchor: string) {
  const $anchor = document.querySelector(anchor)!
  let template = () => ""

  function _render(callback: () => string) {
    const response = callback()
    $anchor.innerHTML = response
  }

  function createTemplate(templateString: () => string): void {
    template = templateString
    _render(template)
  }

  function reactive<T extends {}>(params: T) {
    const proxy = new Proxy(params, {
      set(target, key, value) {
        Reflect.set(target, key, value)

        _render(template)

        return value
      }
    })

    return proxy
  }

  return {
    reactive,
    createTemplate
  }
}
