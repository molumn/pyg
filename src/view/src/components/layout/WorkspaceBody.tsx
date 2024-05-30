import { useThemeContext } from '@view/hooks'

import { Row } from '@view/components/layout/utils'
import { WorkspaceSidebar } from '@view/components/layout/sidebar'
import { WorkspaceSandbox } from '@view/components/layout/sandbox'

export const WorkspaceBody = (): JSX.Element => {
  const theme = useThemeContext()

  return (
    <Row
      style={{
        backgroundColor: theme.color.base
      }}
      className={'mt-[32px]'}
    >
      <WorkspaceSidebar />
      <WorkspaceSandbox />
    </Row>
  )
}
