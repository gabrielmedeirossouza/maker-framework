import { View } from './view'
import { Reactivity } from './reactivity'
import { Action } from './action'

export type TTemplate = () => HTMLElement

export class Maker {
  private _view: View;

  private _reactivity: Reactivity;

  private _action: Action;

  constructor(entryPoint: string) {
    this._view = new View(entryPoint)
    this._reactivity = new Reactivity(this)
    this._action = new Action()
  }

  public get view(): View {
    return this._view
  }

  public get reactivity(): Reactivity {
    return this._reactivity
  }

  public get action(): Action {
    return this._action
  }
}
