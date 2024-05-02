import { useAppDispatch, useAppSelector } from '../../../../hooks'

import { FileContent } from '../../../../../../common/workspace/files'
import {
  changeContentOfSelectedFileContent,
  selectRegisteredFileContents,
  selectSelectedFileContentInRegisteredFileContents
} from '../../../../store/workspace/ProjectFileEditor'
import { MarkdownEditor } from '../editor/MarkdownEditor'
import { IpcSocket } from '../../../../../../common/socket'
import { Column, Row } from '../../utils/Layout'

export const ProjectSandboxArea = (): JSX.Element => {
  const registeredFileContents = useAppSelector(selectRegisteredFileContents)
  const selectedFileContent: FileContent | null = useAppSelector(
    selectSelectedFileContentInRegisteredFileContents
  )
  const dispatcher = useAppDispatch()

  const saveSelectedFileContent = async (content: string): Promise<void> => {
    dispatcher(changeContentOfSelectedFileContent({ content }))

    await IpcSocket.requester.request('workspace', 'saveFile', selectedFileContent)
  }

  return (
    <Column>
      <Row className={'h-[30px] bg-dust-utility text-xs'}>
        {...registeredFileContents.map((content) => (
          <button key={`workspace-project-registered-file-content-${content.path}`}>
            {content.name}
          </button>
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
