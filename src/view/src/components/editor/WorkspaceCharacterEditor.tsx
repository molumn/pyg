import { MarkdownEditor } from '@view/components/editor/MarkdownEditor'

export const WorkspaceCharacterEditor = (): JSX.Element => {
  // todo : hook - get focused file

  const characterContent = 'Hello?'

  return <MarkdownEditor content={characterContent} onSave={async () => {}} />
}
