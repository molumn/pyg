export type CharacterKeyType = 'category' | 'character' | 'profile'

export type CharacterKey = {
  path: string
  name: string
  type: CharacterKeyType
  realFilepath: string
  children: {
    [nextNode: string]: CharacterKey | undefined
  }
}

export type CharacterContent = {
  path: string
  filename: string
  content: string
}

export type ProfileContent = {
  path: string
  filename: string
  content: string
}
