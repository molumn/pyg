import { VscFolder } from 'react-icons/vsc'

import { useTabArea } from '@view/hooks'

import { ReactIcon } from '@view/ui'

import { Column, Row } from '@view/components/layout/utils/Layout'

import { WorkspaceFolderStructureSidebarView } from '@view/components/workspace/sidebar'
import { useThemeContext } from '@view/hooks'
import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'
import { AccordVertical } from '@view/components/layout/utils/AnimatedDisplay'

export const WorkspaceSidebar = ({ sidebarOnOff }: { sidebarOnOff: boolean }): JSX.Element => {
  const theme = useThemeContext()

  const { checkTab, TabButton } = useTabArea(['Folder Structure', 'Plot Hierarchy'])

  return (
    <Row className={'w-auto'}>
      <Column
        style={{
          backgroundColor: theme.color.base
        }}
        className={'w-[38px] p-1 bg-dust-utility'}
      >
        <TabButton name={'Folder Structure'} className={'h-[32px]'}>
          <ReactIcon reactIconType={VscFolder} size={18} />
        </TabButton>
        <TabButton name={'Plot Hierarchy'} className={'h-[32px]'}>
          <ReactIcon reactIconType={VscFolder} size={18} />
        </TabButton>
      </Column>
      <AccordVertical
        animate={sidebarOnOff}
        style={{
          backgroundColor: theme.color.base,
          borderColor: theme.color.separator
        }}
        className={'border-r-[1px]'}
      >
        {/* todo : resizable */}
        <div
          style={{
            borderColor: theme.color.separator
          }}
          className={'border-l-[1px] h-full w-[280px]'}
        >
          <DisplayOptional display={checkTab('Folder Structure')}>
            <WorkspaceFolderStructureSidebarView />
          </DisplayOptional>
          <DisplayOptional display={checkTab('Plot Hierarchy')}>
            <p>plot hierarchy</p>
          </DisplayOptional>
        </div>
      </AccordVertical>
    </Row>
  )
}
