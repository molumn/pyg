export type FileType = FileEncodingType | 'DIRECTORY'
export type FileEncodingType = 'md' | 'raw'

export type FileNode = {
  name: string
  path: string
  type: FileType
  children: {
    [nextNode: string]: FileNode | undefined
  }
}

export type FileContent = {
  name: string
  path: string
  content: string
}

export const getFileType = (filename: string): FileType => {
  const ext = filename.substring(filename.lastIndexOf('.'))
  if (ext === 'md') return 'md'
  else if (ext === '') return 'DIRECTORY'
  else return 'raw'
}
