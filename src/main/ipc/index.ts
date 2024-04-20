import { ipcMain, IpcMainInvokeEvent, IpcMainEvent } from 'electron'
import { WindowControlIpcListeners } from './window-control'
import { WindowStatusIpcListeners } from './window-status'
import { AuthorizationIpcListeners } from './auth'
import { WorkspaceIpcListeners } from './workspace'

type IpcCallbackType = {
  [key: string]: (...args: any[]) => unknown // ignore (@typescript-eslint/no-explicit-any)
}

export type IpcRequesterType<T extends IpcCallbackType> = {
  [key in keyof T]: (...args: Parameters<T[key]>) => ReturnType<T[key]>
}
export type IpcDelayedRequesterType<T extends IpcCallbackType> = {
  [key in keyof T]: (...args: Parameters<T[key]>) => Promise<ReturnType<T[key]>>
}
export type IpcListenerType<T extends IpcCallbackType> = {
  [key in keyof T]: (event: IpcMainEvent, ...args: Parameters<T[key]>) => ReturnType<T[key]>
}
export type IpcHandleListenerType<T extends IpcCallbackType> = {
  [key in keyof T]: (event: IpcMainInvokeEvent, ...args: Parameters<T[key]>) => ReturnType<T[key]>
}

function registerIpcListeners(obj: IpcListenerType<IpcCallbackType>): void {
  for (const key in obj) {
    ipcMain.on(key, obj[key])
  }
}
function registerHandleIpcListeners(obj: IpcHandleListenerType<IpcCallbackType>): void {
  for (const key in obj) {
    ipcMain.handle(key, obj[key])
  }
}

export function registerAllIpcCallbacks(): void {
  registerIpcListeners(WindowControlIpcListeners)
  registerHandleIpcListeners(WindowStatusIpcListeners)
  registerIpcListeners(AuthorizationIpcListeners)
  registerIpcListeners(WorkspaceIpcListeners)
}
