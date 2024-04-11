import { AuthenticationRequest, AuthenticationResponse } from '../../shared/types'
import { loginWithEmail, loginWithGithub, loginWithGoogle } from '../lib/oauth'
import { IpcAPI } from '../../shared/ipcChannel'

export const onAuth: IpcAPI['request-user-authentication'] = async (
  _,
  req: AuthenticationRequest
): Promise<AuthenticationResponse> => {
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
    console.log('email', req.email)
    res = await loginWithEmail(req.email, req.password)
  }
  return res
}
