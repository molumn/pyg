import { WindowManager } from '../handle/window'

type GoogleTokenResponse = {
  token: string
  expires_in: number
  refresh_token: string
  token_type: string
  id_token: string
}

export class GoogleOAuthHandler {
  static readonly clientId: string = process.env.GOOGLE_OAUTH_CLIENT_ID ?? ''
  static readonly clientSecret: string = process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? ''

  static async profile(
    requestId: string,
    redirectURL: string = 'http://localhost'
  ): Promise<GoogleTokenResponse> {
    let token_received = false
    let token: string = ''
    let expire_in: string = ''
    let refresh_token: string = ''
    let token_type: string = ''
    let id_token: string = ''

    return {
      token,
      expires_in: Number.parseInt(expire_in),
      refresh_token,
      id_token,
      token_type
    }
  }
}
