import { AuthenticationRequest, AuthenticationResponse } from '../../shared/types'
import { loginWithEmail, loginWithGithub, loginWithGoogle } from '../lib/oauth'
import { IpcAPI } from '../../shared/ipcChannel'

export const onAuth: IpcAPI['request-user-authentication'] = async (_, req: AuthenticationRequest): Promise<AuthenticationResponse> => {
  if ('type' in req) {
    if (req.type === 'google') {
      await loginWithGoogle()
    } else if (req.type === 'github') {
      await loginWithGithub()
    }
  } else {
    console.log('email', req.email)
    await loginWithEmail(req.email, req.password)
  }
  return {
    result: true, type: 'SignIn'
  } // todo : return really auth response
}
