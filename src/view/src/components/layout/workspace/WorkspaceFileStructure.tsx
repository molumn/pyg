import { ComponentProps, useEffect, useState } from 'react'

import { FileNode } from '../../../../../common/workspace/files'

import { Column, Row } from '../utils/Layout'
import { DisplayOptional } from '../utils/DisplayOptional'
import GrowingDiv from '../utils/GrowingDiv'

import { useWorkspaceFileNodes } from '../../../hooks/useWorkspaceFileNodes'

type WorkspaceFileStructureProps = {
  registerToEditor: (node: FileNode) => Promise<void>
} & ComponentProps<'div'>
export const WorkspaceFileStructure = ({ className, registerToEditor, ...props }: WorkspaceFileStructureProps): JSX.Element => {
  const { rootNode } = useWorkspaceFileNodes()

  const render = (node: FileNode): JSX.Element => {
    return (
      <Column className={`ml-[10px]`}>
        <Row className={'h-[20px] gap-2'}>
          <button className={'w-[10px] h-[10px]'} onClick={() => {
            // todo : expand
          }}>A</button>
          <button className={''} onClick={() => {/* todo: focus */}} onDoubleClick={async () => {
            registerToEditor(node)
          }}>{node.name}</button>
        </Row>
        <DisplayOptional display={true /* expand */} className={'flex flex-col'}>
          {
            ...node.children.map((child) => render(child))
          }
        </DisplayOptional>
      </Column>
    )
  }

  return (
    <Column className={className}>
      <Row className={'h-[30px] px-2'}>
        <GrowingDiv />
        <button onClick={() => {
          // todo : create new File
        }}>+</button>
      </Row>
      {render(rootNode)}
    </Column>
  )
}
