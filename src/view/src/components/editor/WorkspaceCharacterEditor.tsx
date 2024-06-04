import { MarkdownEditor } from '@view/components/editor/MarkdownEditor'
import { useFocusedCharacterTab } from '@view/hooks'

export const WorkspaceCharacterEditor = (): JSX.Element => {
  // todo : hook - get focused file

  const { focusedCharacterTab, saveTabCharacterContent, saveTabProfileContent } = useFocusedCharacterTab()

  if (!focusedCharacterTab) {
    return <div />
  }

  return (
    <>
      <MarkdownEditor content={focusedCharacterTab.character!.content} onSave={(content: string): void => saveTabCharacterContent(focusedCharacterTab, content)} />
      <MarkdownEditor content={focusedCharacterTab.profile?.content ?? ''} onSave={(content: string): void => saveTabProfileContent(focusedCharacterTab, content)} />
    </>
  )
}
