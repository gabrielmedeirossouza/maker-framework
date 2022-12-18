import { HTML_ELEMENT_EVENT_TYPES } from '../action/@constants'
import { randomUUID } from '../../helpers/randomUUID'

type TSpecialAction = Map<string, Function>

type THtmlPreprocessed = {
  raw: string
  specialActions: TSpecialAction
}

export class Template {
  public Create(strings: TemplateStringsArray, ...vars: any[]): HTMLElement {
    const { raw, specialActions } = this._CreateHtmlPreprocessed(strings, ...vars)
    const html = this._CreateHtml(raw)
    this._CreateEventListeners(html, specialActions)

    return html
  }

  private _CreateHtmlPreprocessed(strings: TemplateStringsArray, ...vars: any[]): THtmlPreprocessed {
    let rawHtml = ""
    const specialActions: TSpecialAction = new Map<string, Function>()

    strings.forEach((string, i) => {
      const currentVar = vars[i] ?? ""

      const isFunction = typeof currentVar === 'function'
      const isValidEvent = isFunction && HTML_ELEMENT_EVENT_TYPES.includes((currentVar as Function).name)

      if (isFunction) {
        if (!isValidEvent) throw new Error(`${Template.name}: Invalid function ${currentVar.name}. Did you forget to add an event type? Or maybe you forgot to initialize the function?`)

        const uuid = randomUUID()
        const action = currentVar as Function

        rawHtml += string + `data-${uuid}`
        specialActions.set(uuid, action)

        return
      }

      rawHtml += string + currentVar
    })

    const htmlPreprocessed: THtmlPreprocessed = {
      raw: rawHtml,
      specialActions
    }

    return htmlPreprocessed
  }

  private _CreateHtml(html: string): HTMLElement {
    const parser = new DOMParser()
    const dom = parser.parseFromString(html, "text/html")

    return dom.body
  }

  private _CreateEventListeners(html: HTMLElement, specialActions: TSpecialAction): void {
    const children = Array.from(html.children)

    children.forEach((child) => {
      if (!(child instanceof HTMLElement)) return

      const datasetList = Object.keys(child.dataset)

      datasetList.forEach(uuid => {
        const action = specialActions.get(uuid)

        if (typeof action !== "function") return

        child.addEventListener(action.name, action as () => null)
        child.removeAttribute(`data-${uuid}`)
      })
    })
  }
}
