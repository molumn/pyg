import fs from 'fs'
import path from 'path'

import { FileContent } from '@common/workspace/files'

import { Workspace } from '@app/structure/workspace'

export const readWorkspaceFile = (relpath: string, filename: string): FileContent => {
  const fileContent: FileContent = {
    name: filename,
    path: relpath,
    content: ''
  }

  const workspace = Workspace.instance
  if (!workspace) return fileContent

  const rootPath = workspace.rootPath
  const absPath = path.join(rootPath, relpath)

  if (!fs.existsSync(absPath)) {
    fileContent.name += ' -- No Such File'
    return fileContent
  }

  try {
    fileContent.content = fs.readFileSync(absPath, { encoding: 'utf-8' })
  } catch (err) {
    console.log('FS readFileSync Error - readWorkspaceFile')
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
    console.log('fs saveFileSync Error - saveWorkspaceFile')
    return false
  }
}

export const createWorkspaceDirectory = (...relpath: string[]): boolean => {
  const workspace = Workspace.instance
  if (!workspace) return false

  const rootPath = workspace.rootPath
  const absPath = path.join(rootPath, relpath.join('/'))

  try {
    fs.mkdirSync(absPath)
    return true
  } catch (err) {
    console.log('fs mkdirSync Error - createWorkspaceDirectory')
    return false
  }
}
