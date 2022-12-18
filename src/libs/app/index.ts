import { AppService } from './app-service'

export function App(anchor: string) {
  const appService = new AppService(anchor)

  return appService
}
