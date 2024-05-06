import { VscFolder } from 'react-icons/vsc'

import { useTabArea } from '@view/hooks/useTabs'

import { Column, Row } from '@view/components/layout/utils/Layout'
import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'

import { WorkspaceProjectFileStructureSidebarView } from '@view/components/layout/workspace/sidebar/view'

export const WorkspaceProjectSidebar = (): JSX.Element => {
  const { selectedTab, TabButton } = useTabArea(['File Structure'], true)

  return (
    <Row className={'w-auto border-[1px] border-gray-500'}>
      <Column className={'w-[40px] p-1 bg-dust-utility'}>
        <TabButton name={'File Structure'} className={'h-[32px]'}>
          <VscFolder size={20} />
        </TabButton>
      </Column>
      <DisplayOptional display={selectedTab === 'File Structure'}>
        <WorkspaceProjectFileStructureSidebarView />
      </DisplayOptional>
    </Row>
  )
}
