import { useState } from 'react'

import { FileNode } from '../../../common/workspace/files'
import { IpcSocket } from '../../../common/socket'

export const useProjectFileStructure = () => {
  const [rootNode, setRootNode] = useState<FileNode | null>(null)

  async function fetchRootNode(): Promise<void> {
    const response: FileNode = await IpcSocket.requester.request('workspace', 'getRootNode')
    setRootNode(response)
  }

  return {
    rootNode,
    fetchRootNode
  }
}
