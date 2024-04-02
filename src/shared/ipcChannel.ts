import { WindowType } from './types'

export type IpcCallbackParameters<Args extends unknown[] = [], Return = void> = [Args, Return]
export type IpcCallbackReturn<Return> = [[], Return]

export type IpcResponse<ParamPair extends [unknown[], unknown] = [[], void]> = (event, ...args: ParamPair[0]) => ParamPair[1]

export type IpcRequestChannel =
  | 'request-window-type'

export type IpcChannel =
  | 'set-window-type'
  | IpcRequestChannel

// todo : remove response channel?
export const responseChannel = (to: IpcRequestChannel): string => to.replace('request-', 'response-')

export interface IpcParameter {
  'request-window-type': IpcCallbackReturn<WindowType>
  'set-window-type': IpcCallbackParameters<[WindowType]>
}

export type IpcRequest = <Channel extends IpcChannel>(channel: Channel, ...args: IpcParameter[Channel][0]) => Promise<IpcParameter[Channel][1]>

export type IpcAPI = {
  [channel in IpcChannel]: IpcResponse<IpcParameter[channel]>
}
