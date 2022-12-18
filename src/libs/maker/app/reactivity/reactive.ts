import { Maker } from '../'

export class Reactive {
  private _maker: Maker;

  constructor(maker: Maker) {
    this._maker = maker
  }

  public Create<T extends {}>(params: T) {
    const proxy = new Proxy(params, {
      set: (target, key, value, receiver) => {
        Reflect.set(target, key, value, receiver)

        this._maker.view.Render()

        return value
      }
    })

    return proxy
  }
}
