import { ListenerFn, TAction } from './listener-fn';

export class Action {
    public Listener<T extends keyof HTMLElementEventMap, R extends HTMLElementEventMap[T]>(type: T, action: TAction<R>): TAction<R> {
        const listener = new ListenerFn().Create(type, action);

        return listener;
    }
}
