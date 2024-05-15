import { Column, Row } from '@view/components/layout/utils/Layout'

import { MarkdownEditor } from './editor/MarkdownEditor'
import { useSelectedFileContent } from '@view/hooks/useSelectedFileContent'

export const ProjectSandboxArea = (): JSX.Element => {
  const {
    registeredFileContents,
    selectedFileContent,
    saveSelectedFileContent,
    selectFileContent,
    unregisterFileContent
  } = useSelectedFileContent()

  return (
    <Column className={''}>
      <Row className={'min-h-[30px] h-[30px] bg-dust-utility text-xs'}>
        {...registeredFileContents.map((content) => (
          <Row key={`workspace-project-registered-file-content-${content.path}`}>
            <button onClick={(): void => selectFileContent(content.path)}>{content.name}</button>
            <button onClick={(): void => unregisterFileContent(content.path)}>X</button>
          </Row>
        ))}
      </Row>
      {selectedFileContent?.encoding === 'md' ? (
        <MarkdownEditor contents={selectedFileContent} saveFileContent={saveSelectedFileContent} />
      ) : selectedFileContent?.encoding === 'raw' ? (
        <></>
      ) : (
        <></>
      )}
    </Column>
  )
}
