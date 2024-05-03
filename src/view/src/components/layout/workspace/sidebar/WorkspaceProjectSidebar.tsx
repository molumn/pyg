import { VscFolder } from 'react-icons/vsc'

import { WorkspaceProjectFileStructureSidebarView } from './view/WorkspaceProjectFileStructureSidebarView'
import { useTabArea } from '../../../../hooks/useTabs'
import { Column, Row } from '../../utils/Layout'
import { DisplayOptional } from '../../utils/DisplayOptional'

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
