import { Listener, TAction } from './listener'

export class Action {
  public Listener<T extends keyof HTMLElementEventMap, R extends HTMLElementEventMap[T]>(type: T, action: TAction<R>): TAction<R> {
    const listener = new Listener().Create(type, action)

    return listener
  }
}