import { useState } from 'react'
import { FileNode } from '../../../common/workspace/files'

export const useWorkspaceRegisteredFiles = () => {
  const [registeredFiles, setRegisteredFiles] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<FileNode>({
    name: '',
    path: '',
    type: 'DIRECTORY',
    children: []
  })

  const registerFile = async (node: FileNode): Promise<void> => {
    if (node.type === 'DIRECTORY') return
    if (registeredFiles.find((file) => file.name === node.name)) return

    setRegisteredFiles([...registeredFiles, node])
    setSelectedFile(node)
  }

  const changeFile = async (name: string): Promise<void> => {
    const file = registeredFiles.find((file) => file.name === name)
    if (file) setSelectedFile(file)
  }

  return {
    selectedFile,
    registeredFiles,
    changeFile,
    registerFile
  }
}
