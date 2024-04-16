import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { WindowControlIpcListeners } from './window-control'
import { WindowStatusIpcListeners } from './window-status'
import { AuthorizationIpcListeners } from './auth'

type IpcCallbackType = {
  [key: string]: (...args: any[]) => unknown // ignore (@typescript-eslint/no-explicit-any)
}

export type IpcRequesterType<T extends IpcCallbackType> = {
  [key in keyof T]: (...args: Parameters<T[key]>) => Promise<ReturnType<T[key]>>
}
export type IpcAsyncRequesterType<T extends IpcCallbackType> = {
  [key in keyof T]: (...args: Parameters<T[key]>) => ReturnType<T[key]>
}
export type IpcListenerType<T extends IpcCallbackType> = {
  [key in keyof T]: (event: IpcMainInvokeEvent, ...args: Parameters<T[key]>) => ReturnType<T[key]>
}

function registerIpcListeners(obj: IpcListenerType<IpcCallbackType>): void {
  for (const key in obj) {
    ipcMain.handle(key, obj[key])
    ipcMain.on(key, obj[key])
  }
}
export function registerAllIpcCallbacks(): void {
  registerIpcListeners(WindowControlIpcListeners)
  registerIpcListeners(WindowStatusIpcListeners)
  registerIpcListeners(AuthorizationIpcListeners)
}
