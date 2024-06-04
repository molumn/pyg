import { useRegisteredCharacterTabs, useThemeContext } from '@view/hooks'

import { Column, Row } from '@view/components/layout/utils'
import { WorkspaceCharacterEditor } from '@view/components/editor'
import { Button, FatalButton, ReactIcon, Text } from '@view/ui'
import { VscClose } from 'react-icons/vsc'

export const WorkspaceSandboxCharacter = (): JSX.Element => {
  const theme = useThemeContext()

  const { registeredCharacterTabs, unregisterCharacterTab, focusCharacterTab, focusedCharacterTab } = useRegisteredCharacterTabs()

  return (
    <Column className={'w-auto grow'}>
      <Row
        style={{
          borderColor: theme.color.separator
        }}
        className={'min-h-[30px] max-h-[30px] items-end gap-2 border-b-[1px]'}
      >
        {...registeredCharacterTabs.map((tab) => (
          <Button
            key={'aaa'}
            style={
              focusedCharacterTab?.character.path === tab.character.path
                ? {
                    backgroundColor: theme.color.hover.button
                  }
                : {}
            }
            className={'h-full w-auto px-2 flex flex-row gap-2 centralize rounded-t'}
            onClick={(): void => focusCharacterTab(tab.character.path)}
          >
            <Text size={'xs'}>{`${tab.character.filename} - ${tab.profile?.filename}`}</Text>
            <FatalButton className={'centralize rounded-full'} onClick={(): void => unregisterCharacterTab(tab.character.path)}>
              <ReactIcon reactIconType={VscClose} />
            </FatalButton>
          </Button>
        ))}
      </Row>
      <Column
        style={{
          backgroundColor: 'gray'
        }}
      >
        <WorkspaceCharacterEditor />
      </Column>
    </Column>
  )
}
