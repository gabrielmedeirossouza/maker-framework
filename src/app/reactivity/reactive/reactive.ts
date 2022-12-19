import { Maker } from '@/app';

export class Reactive {
    private _maker: Maker;

    constructor(maker: Maker) {
        this._maker = maker;
    }

    public Create<T extends object>(params: T): T {
        const proxy = new Proxy(params, {
            set: (target, key, value, receiver): any => {
                Reflect.set(target, key, value, receiver);

                this._maker.view.Render();

                return value;
            }
        });

        return proxy;
    }
}
