import { useEffect, useState } from 'react'
import { FileNode } from '../../../common/workspace/files'
import { IpcSocket } from '../../../common/socket'

export const useWorkspaceFileNodes = () => {

  const [rootNode, setRootNode] = useState<FileNode>({
    name: 'hello',
    path: '',
    type: 'DIRECTORY',
    children: []
  })

  async function fetchRootNode(): Promise<void> {
    const response: FileNode = await IpcSocket.requester.request('workspace', 'getRootNode')
    setRootNode(response)
  }

  useEffect(() => {
    fetchRootNode()
  }, [])

  return {
    rootNode,
    fetchRootNode
  }
}
