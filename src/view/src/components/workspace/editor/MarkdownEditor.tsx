import '@blocknote/mantine/style.css'

import { useEffect } from 'react'

import { BlockNoteEditor } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'

import { FileContent } from '@common/workspace/files'
import { CentralizedDiv } from '@view/components/layout/utils/Layout'

export const MarkdownEditor = ({
  content,
  updateContent,
  saveFileContent
}: {
  content: FileContent
  updateContent: (path: string, content: string) => void
  saveFileContent: (path: string) => void
}): JSX.Element => {
  const editorRef: BlockNoteEditor = useCreateBlockNote()

  useEffect(() => {
    async function loadInitialMarkdownContentToBlock(): Promise<void> {
      const blocks = await editorRef.tryParseMarkdownToBlocks(content.content)
      editorRef.replaceBlocks(editorRef.document, blocks)
    }
    loadInitialMarkdownContentToBlock()
  }, [editorRef])

  const onSaveFileContent = async (): Promise<void> => {
    const stringContent = await editorRef.blocksToMarkdownLossy(editorRef.document)
    if (!stringContent) return
    updateContent(content.path, stringContent)
    saveFileContent(stringContent)
  }

  return (
    <CentralizedDiv>
      <BlockNoteView
        className={'w-[80%] h-full mt-5'}
        editor={editorRef}
        onChange={onSaveFileContent}
      />
    </CentralizedDiv>
  )
}
