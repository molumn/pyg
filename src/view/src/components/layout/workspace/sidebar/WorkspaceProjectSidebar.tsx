import { VscFolder } from 'react-icons/vsc'

import { TabbableArea, TabButton, TabSidebar, TabView, TabViewArea } from '../../utils/TabbableArea'
import { WorkspaceProjectFileStructureSidebarView } from './view/WorkspaceProjectFileStructureSidebarView'

export const WorkspaceProjectSidebar = (): JSX.Element => {
  return (
    <TabbableArea
      layout={'row'}
      ableToEmpty={true}
      className={'w-auto border-[1px] border-gray-500'}
    >
      <TabSidebar className={'w-[40px] bg-dust-secondary'}>
        <TabButton name={'File Structure'} className={'h-[32px]'}>
          <VscFolder size={20} />
        </TabButton>
      </TabSidebar>
      <TabViewArea>
        <TabView name={'File Structure'}>
          <WorkspaceProjectFileStructureSidebarView />
        </TabView>
      </TabViewArea>
    </TabbableArea>
  )
}
