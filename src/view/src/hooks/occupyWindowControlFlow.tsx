import { IpcSocket } from '@common/socket'
import { useState } from 'react'

export const occupyWindowControlFlow = (): {
  onClose: () => void
  onMinimize: () => void
  onMaximizeOrRestore: () => void
  isWindowMaximized: boolean
  fetchWindowMaximized: () => Promise<boolean>
  setWindowIsMaximized: (maximized: boolean) => void
} => {
  const [isMaximized, setIsMaximized] = useState(false)

  const onMinimize = (): void => {
    IpcSocket.ipcRenderer.command('windowControl', 'onMinimized')
  }
  const onMaximizeOrRestore = (): void => {
    if (isMaximized) IpcSocket.ipcRenderer.command('windowControl', 'onRestore')
    else IpcSocket.ipcRenderer.command('windowControl', 'onMaximized')
  }
  const onClose = (): void => {
    IpcSocket.ipcRenderer.command('windowControl', 'onClose')
  }

  const fetchWindowMaximized = async (): Promise<boolean> => {
    return await IpcSocket.ipcRenderer.request('windowStatus', 'getWindowIsMaximized')
  }

  return {
    onClose,
    onMinimize,
    onMaximizeOrRestore,
    isWindowMaximized: isMaximized,
    fetchWindowMaximized,
    setWindowIsMaximized: setIsMaximized
  }
}
