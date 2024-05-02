import { useRef } from 'react'

import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin
} from '@mdxeditor/editor'

import { FileContent } from '../../../../../../common/workspace/files'

export const MarkdownEditor = ({
  contents,
  saveFileContent
}: {
  contents: FileContent
  saveFileContent: (content: string) => Promise<void>
}): JSX.Element => {
  const editorRef = useRef<MDXEditorMethods>(null)

  const onSaveFileContent = async (): Promise<void> => {
    const content = editorRef.current?.getMarkdown()
    await saveFileContent(content)
  }

  return (
    <MDXEditor
      ref={editorRef}
      key={contents?.name ?? '!empty!'}
      markdown={contents?.content ?? ''}
      onChange={onSaveFileContent}
      onBlur={onSaveFileContent}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="outline-none h-full max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
