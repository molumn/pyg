import { WorkspaceBody, WorkspaceFooter, WorkspaceHeader } from '@view/components/layout'
import { Column } from '@view/components/layout/utils'
import { CreateOrOpenWorkspaceModal } from '@view/components/modal'

export const WorkspacePage = (): JSX.Element => {
  return (
    <Column>
      <WorkspaceHeader />
      <WorkspaceBody />
      <WorkspaceFooter />

      <CreateOrOpenWorkspaceModal />
    </Column>
  )
}
