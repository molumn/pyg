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
import '@mdxeditor/editor/style.css'

import { FileContent } from '@common/workspace/files'

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
      plugins={[
        toolbarPlugin({ toolbarContents: () => <></> }),
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
        'outline-none h-full max-h-screen max-w-none px-8 py-5',
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
