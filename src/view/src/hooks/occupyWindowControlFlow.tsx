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
    IpcSocket.ipcRenderer.command('window/control/minimize')
  }
  const onMaximizeOrRestore = (): void => {
    if (isMaximized) IpcSocket.ipcRenderer.command('window/control/restore')
    else IpcSocket.ipcRenderer.command('window/control/maximize')
  }
  const onClose = (): void => {
    IpcSocket.ipcRenderer.command('window/control/close')
  }

  const fetchWindowMaximized = async (): Promise<boolean> => {
    return await IpcSocket.ipcRenderer.request('window/status/maximized')
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
