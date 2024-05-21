import { useAppDispatch, useAppSelector } from '@view/hooks/index'
import { selectRootNode, updateRootNode } from '@view/store/ProjectFileNode'

export const useProjectFolderStructure = () => {
  const rootNode = useAppSelector(selectRootNode)
  const dispatcher = useAppDispatch()

  function fetchRootNode(): void {
    dispatcher(updateRootNode())
  }

  return {
    rootNode,
    fetchRootNode
  }
}
