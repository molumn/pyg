import { useHookWorkspaceSidebarFocusedType, useThemeContext } from '@view/hooks'

import { Row } from '@view/components/layout/utils'
import { WorkspaceSidebar } from '@view/components/layout/sidebar'

export const WorkspaceBody = (): JSX.Element => {
  const theme = useThemeContext()
  const { focusedSidebarType } = useHookWorkspaceSidebarFocusedType()

  return (
    <Row
      style={{
        backgroundColor: theme.color.base
      }}
      className={'mt-[32px]'}
    >
      <WorkspaceSidebar />
      <div>{focusedSidebarType}</div>
    </Row>
  )
}
