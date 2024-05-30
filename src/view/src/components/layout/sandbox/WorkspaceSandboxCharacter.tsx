import { useThemeContext } from '@view/hooks'

import { Column, Row } from '@view/components/layout/utils'

export const WorkspaceSandboxCharacter = (): JSX.Element => {
  const theme = useThemeContext()

  return (
    <Column className={'w-auto grow'}>
      <Row
        style={{
          borderColor: theme.color.separator
        }}
        className={'min-h-[30px] max-h-[30px] items-center border-b-[1px]'}
      >
        <p>tabs</p>
      </Row>
      <Column
        style={{
          backgroundColor: 'gray'
        }}
      ></Column>
    </Column>
  )
}
