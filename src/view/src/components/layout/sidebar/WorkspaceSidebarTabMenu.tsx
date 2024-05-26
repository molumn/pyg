import { Column } from '@view/components/layout/utils'
import { useHookWorkspaceSidebarTabController, useThemeContext } from '@view/hooks'

export const WorkspaceSidebarTabMenu = (): JSX.Element => {
  const theme = useThemeContext()

  const { tabButtons, TabButton } = useHookWorkspaceSidebarTabController()

  return (
    <Column
      style={{
        borderColor: theme.color.separator
      }}
      className={'min-w-[40px] w-[40px] border-r-[1px] py-1'}
    >
      {...tabButtons.map((button) => <TabButton key={`workspace-sidebar-tab-button-[${button.name}]`} button={button} className={'rounded my-[2px] mx-1'} />)}
    </Column>
  )
}
