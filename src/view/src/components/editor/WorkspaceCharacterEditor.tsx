import '@blocknote/core/fonts/inter.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView, Theme } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'

import './blocknote-sizing.css'
import { useThemeContext } from '@view/hooks'

export const WorkspaceCharacterEditor = (): JSX.Element => {
  const theme = useThemeContext()

  const editor = useCreateBlockNote({})
  const editorTheme: Theme = {
    colors: {
      editor: {
        background: theme.color.base,
        text: theme.color.text
      },
      sideMenu: theme.color.icon,
      tooltip: {
        background: theme.color.base,
        text: theme.color.text
      },
      menu: {
        background: theme.color.base,
        text: theme.color.text
      }
    },
    borderRadius: 0,
    fontFamily: 'mono'
  }

  return (
    <BlockNoteView
      style={{
        height: '100%'
      }}
      editor={editor}
      theme={editorTheme}
    />
  )
}
