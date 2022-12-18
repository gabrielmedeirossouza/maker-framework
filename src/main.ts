import './style.css'
import { App } from './libs/app'

const app = App(".app")

const data = app.reactive({
  title: "Hello World",
  counter: 0
})

function handleIncrement() {
  data.counter++
}

app.template(() => app.createTemplate`
  <div class="content">
    <h1>${data.title}</h1>
    <p>Counter: ${data.counter}</p>
  </div>
  <button type="button" ${app.on("mousemove", handleIncrement)}>Increment</button>
`)