type TTemplate = () => HTMLElement

export class App {
  private _anchor: HTMLElement;
  private _template: TTemplate = (() => ({} as HTMLElement))

  constructor(anchor: string) {
    const attemptGetAnchor = document.querySelector(anchor) as HTMLElement | undefined

    if (!attemptGetAnchor) throw new Error(`Anchor provided ${anchor} not found in DOM.`)

    this._anchor = attemptGetAnchor
  }

  private _Render(callbackTemplate: TTemplate): void {
    const body = callbackTemplate()
    this._anchor.innerHTML = ""
    
    Array.from(body.children).forEach(element => {
      this._anchor.appendChild(element)
    })
  }

  public Template(templateString: TTemplate): void {
    this._template = templateString
    this._Render(this._template)
  }

  public CreateTemplate(strings: TemplateStringsArray, ...vars: any[]): HTMLElement {
    const result: string[] = []
    const specialActions = new Map<string, Function>()

    strings.forEach((string, i) => {
      const currentVar = vars[i] ?? ""

      if (typeof currentVar === 'function') {
        const uuid = crypto.randomUUID().replaceAll("-", "").toLocaleLowerCase()
        const action = currentVar as Function
 
        result.push(string + `data-${uuid}`)
        specialActions.set(uuid, action)

        return
      }


      result.push(string + currentVar)
    })

    const html = new DOMParser().parseFromString(result.join(""), "text/html").body

    Array.from(html.children).forEach((child) => {
      if (!(child instanceof HTMLElement)) return

      Object.keys(child.dataset).forEach(uuid => {
        if (typeof specialActions.get(uuid) === "function") {
          const action = specialActions.get(uuid) as () => null
  
          child.addEventListener(action.name, action)
  
          child.removeAttribute(`data-${uuid}`)
        }
      })
    })

    return html
  }

  public On<T extends keyof HTMLElementEventMap, R extends HTMLElementEventMap[T]>(type: T, action: (ev: R) => void) {
    const fn = (ev: R) => action(ev)

    Object.defineProperty(fn, "name", {
      value: type,
      configurable: false
    })

    return fn
  }

  public Reactive<T extends {}>(params: T) {
    const proxy = new Proxy(params, {
      set: (target, key, value) => {
        Reflect.set(target, key, value)

        this._Render(this._template)

        return value
      }
    })

    return proxy
  }
}
