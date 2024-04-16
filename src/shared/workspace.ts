import { lastNodeOf, summarizePath } from './fileUtils'

export type WorkspaceFileNodeType =
  | 'txt'
  | 'markdown'
  | 'DIRECTORY'

export class WorkspaceFileNode {
  readonly fileName: string
  readonly relpath: string
  readonly type: WorkspaceFileNodeType
  readonly children: WorkspaceFileNode[]

  constructor(relpath: string, type: WorkspaceFileNodeType, children: WorkspaceFileNode[] = []) {
    this.fileName = lastNodeOf(relpath)
    this.relpath = summarizePath(relpath)
    this.type = type
    this.children = children
  }
}
