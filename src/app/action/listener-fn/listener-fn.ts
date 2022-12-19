export type TAction<R> = (ev: R) => void

export class ListenerFn {
    public Create<T extends keyof HTMLElementEventMap, R extends HTMLElementEventMap[T]>(type: T, action: (ev: R) => void): TAction<R> {
        const fn: TAction<R> = (ev: R) => action(ev);

        Object.defineProperty(fn, "name", {
            value: type,
            configurable: false
        });

        return fn;
    }
}
