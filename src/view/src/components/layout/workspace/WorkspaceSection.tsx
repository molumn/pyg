import React from 'react'

import { VscFolder } from 'react-icons/vsc'

import { Column, Row } from '../utils/Layout'
import { TabbableArea, TabButton, TabSidebar, TabView, TabViewArea } from '../utils/TabbableArea'

import { WorkspaceFileStructure } from './WorkspaceFileStructure'
import { useWorkspaceRegisteredFiles } from '../../../hooks'
import { hash } from '../../../../../common/hash'

export type WorkspaceSectionSidebarType = 'project' | 'flag'
type WorkspaceSectionProps = {
  sidebar: WorkspaceSectionSidebarType
}
export const WorkspaceSection = ({ sidebar }: WorkspaceSectionProps): JSX.Element => {
  const {
    registeredFiles,
    changeFile,
    registerFile
  } = useWorkspaceRegisteredFiles()

  return (
    <Row className={'h-full'}>
      {
        sidebar === 'project' ? (
          <TabbableArea layout={'row'} ableToEmpty={true} className={'w-auto border-t-[1px] border-r-[1px] border-b-[1px] border-gray-500'}>
            <TabSidebar className={'w-[40px] border-r-[1px] border-gray-500 bg-dust-secondary'}>
              <TabButton name={'File Structure'} className={'h-[30px] m-1 rounded-xl centralize'}><VscFolder size={20} /></TabButton>
            </TabSidebar>
            <TabViewArea>
              <TabView name={'File Structure'}>
                <WorkspaceFileStructure className={'w-[280px] py-2 h-full bg-dust-secondary text-sm'} registerToEditor={registerFile} />
              </TabView>
            </TabViewArea>
          </TabbableArea>
        ) : sidebar === 'flag' ? (
          <TabbableArea layout={'row'} ableToEmpty={true} className={'w-auto border-t-[1px] border-r-[1px] border-b-[1px] border-gray-500'}>
            <TabSidebar className={'w-[40px] border-r-[1px] border-gray-500 bg-dust-secondary'}>
            </TabSidebar>
            <TabViewArea>
            </TabViewArea>
          </TabbableArea>
        ) : (
          <></>
        )
      }
      <Column>
        <Row className={'h-[30px] bg-dust-utility'}>
          {
            ...registeredFiles.map((file) => <button key={hash(`workspace-editor-tab-${file.path}`)} onClick={() => changeFile(file.name)}>{file.name}</button>)
          }
        </Row>
        {/* todo : Editor */}
      </Column>
    </Row>
  )
}
