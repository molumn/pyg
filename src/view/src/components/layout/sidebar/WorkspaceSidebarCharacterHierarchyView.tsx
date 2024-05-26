import { useHookWorkspaceCharacterHierarchy } from '@view/hooks'

import { WorkspaceSidebarHierarchyViewTemplate } from '@view/components/layout/sidebar'

export const WorkspaceSidebarCharacterHierarchyView = (): JSX.Element => {
  const { characterHierarchyKey, fetchCharacterHierarchy } = useHookWorkspaceCharacterHierarchy()
  fetchCharacterHierarchy()

  return <WorkspaceSidebarHierarchyViewTemplate>{JSON.stringify(characterHierarchyKey)}</WorkspaceSidebarHierarchyViewTemplate>
}
