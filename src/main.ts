import './style.css'
import { App } from './libs/App'

const app = new App(".app")

const data = app.Reactive({
  title: "Hello World",
  counter: 0
})

function handleIncrement() {
  data.counter++
}

app.Template(() => app.CreateTemplate`
  <div class="content">
    <h1>${data.title}</h1>
    <p>Counter: ${data.counter}</p>
  </div>
  <button type="button" ${app.On("click", handleIncrement)}>Increment</button>
`)