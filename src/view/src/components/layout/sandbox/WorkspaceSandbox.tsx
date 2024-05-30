import { useHookWorkspaceSidebarFocusedType } from '@view/hooks'

import { OptionalDisplay } from '@view/components/layout/utils'

import { WorkspaceSandboxCharacter } from '@view/components/layout/sandbox'

export const WorkspaceSandbox = (): JSX.Element => {
  const { checkFocused } = useHookWorkspaceSidebarFocusedType()

  return (
    <OptionalDisplay display={checkFocused('Character Hierarchy')}>
      <WorkspaceSandboxCharacter />
    </OptionalDisplay>
  )
}
