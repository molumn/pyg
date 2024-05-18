import { Column, Row } from '@view/components/layout/utils/Layout'

import { MarkdownEditor } from '@view/components/workspace/editor/MarkdownEditor'
import { useFileContentsHandler, useSelectedFileContent } from '@view/hooks'
import { FileContent } from '@common/workspace/files'

export const ProjectSandboxArea = (): JSX.Element => {
  const { focusedFileContent, focusFileContent } = useSelectedFileContent()

  const { registeredFileContents, unregisterFileContent, updateContent, saveFileContent } =
    useFileContentsHandler()

  const closeFileContentTab = (content: FileContent): void => {
    updateContent(content.path, content.content)
    saveFileContent(content.path)
    unregisterFileContent(content.path)
  }

  return (
    <Column className={''}>
      <Row className={'min-h-[30px] h-[30px] bg-dust-utility text-xs'}>
        {...Object.keys(registeredFileContents).map((key) => {
          const content = registeredFileContents[key]
          return (
            <Row key={`workspace-project-registered-file-content-${content.path}`}>
              <button onClick={(): void => focusFileContent(content.path)}>{content.name}</button>
              <button onClick={(): void => closeFileContentTab(content)}>X</button>
            </Row>
          )
        })}
      </Row>
      {focusedFileContent?.encoding === 'md' ? (
        <MarkdownEditor
          content={focusedFileContent}
          updateContent={updateContent}
          saveFileContent={saveFileContent}
        />
      ) : focusedFileContent?.encoding === 'raw' ? (
        <></>
      ) : (
        <></>
      )}
    </Column>
  )
}
