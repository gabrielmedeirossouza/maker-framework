import './style.css'
import { Maker } from './libs/maker'

const app = Maker(".app")

const data = app.reactivity.Reactive({
  title: "Hello World",
  counter: 0
})

function handleIncrement() {
  data.counter++
}

function handleDecrement() {
  data.counter--
}

app.view.Render(() => app.view.Template`
  <div class="content">
    <h1>${data.title}</h1>
    <p>Counter: ${data.counter}</p>
  </div>
  <button type="button" ${app.action.Listener("click", handleIncrement)}>Increment</button>
  <button type="button" ${app.action.Listener("click", handleDecrement)}>Decrement</button>
`)