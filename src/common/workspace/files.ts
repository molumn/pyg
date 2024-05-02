export type FileType = FileEncodingType | 'DIRECTORY'
export type FileEncodingType = 'md' | 'raw'

export type FileNode = {
  name: string
  path: string
  type: FileType
  children: FileNode[]
}

export type FileContent = {
  name: string
  path: string
  encoding: FileEncodingType
  content: string
}
