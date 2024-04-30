import './assets/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { IpcSocket } from '../../common/socket'

window.addEventListener('DOMContentLoaded', () => {
  IpcSocket.createRequester(window)
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/*<Provider store={store}>*/}
    <App />
    {/*</Provider>*/}
  </React.StrictMode>
)
