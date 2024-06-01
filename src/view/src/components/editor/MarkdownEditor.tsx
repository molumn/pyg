import { useCallback, useEffect } from 'react'

import '@blocknote/core/fonts/inter.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView, Theme } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'

import { useThemeContext } from '@view/hooks'

import './blocknote-sizing.css'

export const MarkdownEditor = ({
  content,
  onSave
}: {
  content: string // todo : Block[]
  onSave: () => Promise<void>
}): JSX.Element => {
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

  // const markdownInputChanged = useCallback(async () => {
  //   const blocks = await editor.tryParseMarkdownToBlocks('')
  //   editor.replaceBlocks(editor.document, blocks)
  // }, [editor])

  useEffect(() => {
    async function loadInitialHTML(): Promise<void> {
      const blocks = await editor.tryParseMarkdownToBlocks(content)
      editor.replaceBlocks(editor.document, blocks)
    }
    loadInitialHTML()
  }, [editor])

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
