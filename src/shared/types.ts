export type WindowType = 'start' | 'workspace' | 'login' | 'popup'

export type AuthenticationRequest = {
  req: {
    type: 'SignIn' | 'SignUp' | 'SignInWithCredentials'
  }
} & (
  | {
      type: 'email'
      email: string
      password: string
    }
  | {
      type: 'google'
    }
  | {
      type: 'github'
    }
)
export type AuthenticationResponse = {
  type: 'SignIn' | 'SignUp' | 'SignInWithCredentials'
  result: boolean
}

export type WorkspaceType = 'planning-game' | 'demo'

export type WorkspaceKey = {
  name: string
  rootPath: string
  type: WorkspaceType
}
