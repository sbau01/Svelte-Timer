import { mount } from 'svelte'
import '/Svelte-Timer/src/app.css'
import App from '/Svelte-Timer/src/App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
