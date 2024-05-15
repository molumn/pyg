import { VscFolder } from 'react-icons/vsc'
import { twMerge } from 'tailwind-merge'

import { useTabArea } from '@view/hooks/useTabs'

import { Column, Row } from '@view/components/layout/utils/Layout'

import { WorkspaceFolderStructureSidebarView } from '@view/components/layout/workspace/sidebar/view'
import { AccordHorizontal, AccordVertical } from '@view/components/layout/utils/AnimatedDisplay'

export const WorkspaceSidebar = ({ sidebarOnOff }: { sidebarOnOff: boolean }): JSX.Element => {
  const { selectedTab, TabButton } = useTabArea(['File Structure'], true)

  return (
    <Row className={'w-auto'}>
      <Column className={'w-[40px] p-1 bg-dust-utility border-gray-500 border-b-[1px]'}>
        <TabButton name={'File Structure'} className={'h-[32px]'}>
          <VscFolder size={20} />
        </TabButton>
      </Column>
      <WorkspaceFolderStructureSidebarView sidebarOnOff={sidebarOnOff} />
    </Row>
  )
}
