import { WindowType } from './types'

export type IpcCallbackParameters<Args extends unknown[] = [], Return = void> = [Args, Return]
export type IpcCallbackReturn<Return> = [[], Return]

export type IpcResponse<ParamPair extends [unknown[], unknown] = [[], void]> = (event, ...args: ParamPair[0]) => ParamPair[1]

export type IpcRequestChannel =
  | 'request-window-type'
  | 'request-window-is-maximized'
  | 'request-close-window'
  | 'request-minimize-window'
  | 'request-maximize-window'
  | 'request-restore-window'
  | 'request-change-window'

export type IpcChannel =
  | IpcRequestChannel

export interface IpcParameter {
  'request-window-type': IpcCallbackReturn<WindowType>
  'request-window-is-maximized': IpcCallbackReturn<boolean>
  'request-close-window': IpcCallbackParameters
  'request-minimize-window': IpcCallbackParameters
  'request-maximize-window': IpcCallbackParameters
  'request-restore-window': IpcCallbackParameters
  'request-change-window': IpcCallbackParameters<[WindowType]>
}

export type IpcRequest = <Channel extends IpcChannel>(channel: Channel, ...args: IpcParameter[Channel][0]) => Promise<IpcParameter[Channel][1]>

export type IpcAPI = {
  [channel in IpcChannel]: IpcResponse<IpcParameter[channel]>
}
