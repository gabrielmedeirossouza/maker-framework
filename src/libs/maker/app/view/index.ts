import { Render } from './render'
import { Template } from './template'

export type TTemplate = () => HTMLElement

export class View {
  public currentTemplate: TTemplate = () => document.createElement("body")

  private _anchor: string;

  constructor(anchor: string) {
    this._anchor = anchor
  }

  public Render(callbackTemplate?: TTemplate): void {
    new Render(this, this._anchor).Make(callbackTemplate)
  }

  public Template(strings: TemplateStringsArray, ...vars: any[]): HTMLElement {
    const template = new Template().Create(strings, ...vars)

    return template
  }
}