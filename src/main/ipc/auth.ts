import { AuthenticationRequest, AuthenticationResponse } from '../../shared/types'
import { loginWithEmail, loginWithGithub, loginWithGoogle } from '../lib/oauth'
import { IpcListenerType } from './index'

export type AuthorizationIpcCallbacks = {
  onAuth: (request: AuthenticationRequest) => Promise<AuthenticationResponse>
}

export const AuthorizationIpcListeners: IpcListenerType<AuthorizationIpcCallbacks> = {
  onAuth: async (_, req: AuthenticationRequest): Promise<AuthenticationResponse> => {
    let res: AuthenticationResponse
    if ('type' in req) {
      if (req.type === 'google') {
        res = await loginWithGoogle()
      } else if (req.type === 'github') {
        res = await loginWithGithub()
      } else {
        res = {
          result: false,
          type: 'SignIn'
        }
      }
    } else {
      res = await loginWithEmail(req.email, req.password)
    }
    return res
  }
}
