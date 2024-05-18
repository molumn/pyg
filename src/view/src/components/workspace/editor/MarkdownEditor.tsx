import { useRef } from 'react'

import { twMerge } from 'tailwind-merge'

import {
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin
} from '@mdxeditor/editor'
// import '@mdxeditor/editor/style.css'
import '@view/assets/mdxeditor.css'

import { FileContent } from '@common/workspace/files'

import { Row } from '@view/components/layout/utils/Layout'

const MarkdownEditorToolbar = (): JSX.Element => {
  return (
    <Row className={'h-[25px] items-center'}>
      <button>a</button>
      <button>b</button>
      <button>c</button>
      <button>d</button>
      <button>e</button>
      <button>f</button>
    </Row>
  )
}

export const MarkdownEditor = ({
  content,
  updateContent,
  saveFileContent
}: {
  content: FileContent
  updateContent: (path: string, content: string) => void
  saveFileContent: (path: string) => void
}): JSX.Element => {
  const editorRef = useRef<MDXEditorMethods>(null)

  const onSaveFileContent = (): void => {
    const stringContent = editorRef.current?.getMarkdown()
    if (!stringContent) return
    updateContent(content.path, stringContent)
    saveFileContent(stringContent)
  }

  return (
    <MDXEditor
      ref={editorRef}
      key={content?.name ?? '!empty!'}
      markdown={content?.content ?? ''}
      onChange={onSaveFileContent}
      onBlur={onSaveFileContent}
      plugins={[
        toolbarPlugin({ toolbarContents: MarkdownEditorToolbar }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' }
        }),
        // directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin()
      ]}
      contentEditableClassName={twMerge(
        'bg-gray-600',
        'outline-none min-h-[80%] max-h-screen max-w-none px-8 py-5',
        'overflow-x-scroll overflow-y-scroll',
        'caret-yellow-500',
        'prose prose-invert',
        'prose-p:my-3 prose-p:leading-relaxed',
        'prose-headings:my-4',
        'prose-blockquote:my-4',
        'prose-ul:my-2 prose-li:my-0',
        "prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      )}
    />
  )
}
