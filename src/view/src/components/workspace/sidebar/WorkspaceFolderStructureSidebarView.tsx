import { useEffect } from 'react'

import { FileNode } from '@common/workspace/files'

import { useFileContentsHandler, useProjectFolderStructure, useThemeContext } from '@view/hooks'

import { CentralizedDiv, Column, Row } from '@view/components/layout/utils/Layout'
import { TextButton } from '@view/ui'

export const WorkspaceFolderStructureSidebarView = (): JSX.Element => {
  // todo : globalize workspace information
  const { rootNode, fetchRootNode } = useProjectFolderStructure()

  useEffect(() => {
    fetchRootNode()
  }, [])

  const { registerFileContent } = useFileContentsHandler()

  const onFileNodeSelected = (node: FileNode): void => {
    if (node?.type === 'DIRECTORY') return
    registerFileContent(node)
  }

  const RenderSingleNode = ({ node }: { node: FileNode }): JSX.Element => {
    return (
      <Row className={'h-auto w-auto gap-1'}>
        <p>ㄴ</p>
        <button
          className={'flex items-center'}
          onDoubleClick={(): void => onFileNodeSelected(node)}
        >
          {node?.name}
        </button>
      </Row>
    )
  }

  const RenderDirectory = ({ node }: { node: FileNode }): JSX.Element => {
    if (node.name === '') return <></>
    if (node.type !== 'DIRECTORY') return <RenderSingleNode node={node} />

    return (
      <Column>
        <Row className={'h-auto w-auto gap-1'}>
          <p>ㄴ</p>
          <button className={'flex items-center'}>{node.name}</button>
        </Row>
        <Column className={'h-auto pl-2'}>
          {...node?.children.map((child) => (
            <RenderDirectory key={`project-file-structure-node-[${child.path}]`} node={child} />
          ))}
        </Column>
      </Column>
    )
  }

  const theme = useThemeContext()

  return (
    <Column
      style={{
        backgroundColor: theme.color.base,
        borderColor: theme.color.separator
      }}
      className={'w-full h-full p-2 text-xs overflow-x-hidden overflow-y-scroll'}
    >
      {rootNode !== null ? (
        <RenderDirectory node={rootNode} />
      ) : (
        <CentralizedDiv
          style={{
            backgroundColor: theme.color.base,
            borderColor: theme.color.separator
          }}
          className={'w-full h-full overflow-x-hidden overflow-y-scroll flex-col'}
        >
          <TextButton size={'md'}>New Workspace</TextButton>
          <TextButton size={'md'}>Open Workspace</TextButton>
          <TextButton size={'md'}>Open File</TextButton>
        </CentralizedDiv>
      )}
    </Column>
  )
}
