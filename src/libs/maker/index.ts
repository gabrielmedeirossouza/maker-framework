import { Maker as MakerApp } from './app'

export function Maker(entryPoint: string) {
  const app = new MakerApp(entryPoint)

  return app
}
