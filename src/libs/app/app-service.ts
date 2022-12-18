import { App, TTemplate } from './app'

export class AppService {
  private app: App;

  constructor(anchor: string) {
    this.app = new App(anchor);
  }

  public template(templateString: TTemplate): void {
    this.app.Template(templateString);
  }

  public createTemplate(strings: TemplateStringsArray, ...vars: any[]): HTMLElement {
    return this.app.CreateTemplate(strings, ...vars);
  }

  public on<T extends keyof HTMLElementEventMap, R extends HTMLElementEventMap[T]>(type: T, action: (ev: R) => void): (ev: R) => void {
    return this.app.On(type, action);
  }

  public reactive<T extends {}>(params: T): T {
    return this.app.Reactive(params);
  }
}