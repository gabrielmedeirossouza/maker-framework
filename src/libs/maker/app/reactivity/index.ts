import { Maker } from '../'
import { Reactive } from './reactive'

export class Reactivity {
  private _maker: Maker;

  constructor(maker: Maker) {
    this._maker = maker
  }

  public Reactive<T extends {}>(params: T): T {
    const reactive = new Reactive(this._maker,).Create(params)

    return reactive
  }
}