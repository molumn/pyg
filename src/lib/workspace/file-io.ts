import fs from 'fs'
import path from 'path'

import { FileContent, FileEncodingType, FileNode } from '@common/workspace/files'

import { Workspace } from '@app/structure/workspace'

export const readWorkspaceFile = (fileNode: FileNode): FileContent => {
  const fileContent: FileContent = {
    name: fileNode.name,
    path: fileNode.path,
    content: '',
    encoding: 'raw'
  }

  const workspace = Workspace.instance
  if (!workspace) return fileContent

  const rootPath = workspace.rootPath
  const childPath = fileNode.path
  const absPath = path.join(rootPath, childPath)

  if (!fs.existsSync(absPath)) {
    fileContent.name += ' -- No Such File'
    return fileContent
  }

  try {
    fileContent.content = fs.readFileSync(absPath, { encoding: 'utf-8' })
    fileContent.encoding = fileNode.name.substring(
      fileNode.name.lastIndexOf('.') + 1
    ) as FileEncodingType
  } catch (err) {
    console.log('FS readFileSync Error')
  }

  return fileContent
}

export const saveWorkspaceFile = (fileContent: FileContent): boolean => {
  // todo : handle other process
  const workspace = Workspace.instance
  if (!workspace) return false

  const rootPath = workspace.rootPath
  const absPath = path.join(rootPath, fileContent.path)

  try {
    fs.writeFileSync(absPath, fileContent.content, { encoding: 'utf-8', flag: 'w' })
    return true
  } catch (err) {
    console.log('fs saveFileSync Error')
    return false
  }
}
