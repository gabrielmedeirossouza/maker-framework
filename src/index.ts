import { Maker as MakerApp } from './app';

export function Maker(entryPoint: string): MakerApp {
    const app = new MakerApp(entryPoint);

    return app;
}
