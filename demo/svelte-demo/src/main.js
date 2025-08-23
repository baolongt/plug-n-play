import './app.css'
import App from './App.svelte'

// Polyfill
if (typeof window !== 'undefined') window.global = window;

export default new App({
  target: document.getElementById('app')
})
