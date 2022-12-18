export type TAction<R> = (ev: R) => void

export class Listener {
  public Create<T extends keyof HTMLElementEventMap, R extends HTMLElementEventMap[T]>(type: T, action: (ev: R) => void) {
    const fn = (ev: R) => action(ev)

    Object.defineProperty(fn, "name", {
      value: type,
      configurable: false
    })

    return fn
  }
}
