import '@view/assets/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import { IpcSocket } from '@common/socket'

import { store } from '@view/store'

import App from './App'

window.addEventListener('DOMContentLoaded', () => {
  const socket = IpcSocket.createIpcRendererUnit(window)

  socket.once('onWindowContentLoaded', (): void => {})
  socket.once('onWindowClosing', (): void => {})
  socket.once('onWorkspaceOpen', (): void => {})
  socket.once('onWorkspaceClose', (): void => {})
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
