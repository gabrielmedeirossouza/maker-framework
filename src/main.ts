import './style.css'
import { App } from './libs/App'

const app = new App("#app")

const vars = app.Reactive({
  title: "Hello World",
  open: false
})

app.Template(() => app.CreateTemplate`
  <div
    ${app.OnMouseover(() => { console.log('passou mouse por cima!!') })}
    ${app.OnClick(() => { console.log('clicou!!') })}
  >
    <h1>${vars.title}</h1>
  </div>
  ${vars.open ? `<p>Está aberto</p>` : ""}
`)

window.addEventListener('click', () => {
  vars.open = true
})
