export type FileType = EncodingType | 'DIRECTORY'
export type EncodingType = 'md' | 'txt'

export type FileNode = {
  name: string
  path: string
  type: FileType
  children: FileNode[]
}

export type FileContent = {
  name: string
  path: string
  encoding: EncodingType
  content: string
}
