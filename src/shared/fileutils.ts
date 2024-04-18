import { HashCode } from './hash'

export const relativePath = (...paths: string[]): string => {
  const nodes: string[] = ['.']
  const popOrNone = (): void => {
    if (nodes.length > 1) nodes.pop()
  }
  for (const path of paths) {
    path.split('/').forEach((node) => {
      if (node === '.') return
      else if (node === '..') popOrNone()
      else nodes.push(node)
    })
  }
  return nodes.join('/')
}

export const lastNodeOf = (path: string): string => path.substring(path.lastIndexOf('/') + 1)

export enum FileType {
  DIRECTORY = 0,
  TXT = 'txt',
  MARKDOWN = 'md'
}

export type RootNode = {
  abspath: string

  getChildOf: (node: FileNode, relpath: string) => FileNode | undefined
  getChildrenOf: (node: FileNode) => FileNode[]
}

export type FilePointer = {
  id: HashCode
  type: FileType
  root: RootNode
}

export type FileNode = {
  filename: string
  pointer: FilePointer
}

// file content type

export type FileContent = {
  type: FileType
  content: string
}
