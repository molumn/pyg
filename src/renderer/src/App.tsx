import { ReactNode } from 'react'
import { selectWindowType } from './store/state/window'
import { useAppSelector } from './hooks'

import { Frame } from './components/Frame'

import { LoginPage } from './LoginPage'
import { StartPage } from './StartPage'
import { WorkspacePage } from './WorkspacePage'
import { ErrorPage } from './ErrorPage'

import { TitleBarSection } from './components/TitleBar'
import { WindowControlButtons } from './components/button/WindowControlButtons'

export default function App(): ReactNode {
  const windowType = useAppSelector(selectWindowType)

  return (
    <>
      <TitleBarSection>
        <div className={'w-[135px]'}>left</div>
        <div className={'grow'} />
        <div className={'justify-self-center self-center'}>center</div>
        <div className={'grow'} />
        <div className={'justify-self-center self-center'}>right</div>
        <WindowControlButtons />
      </TitleBarSection>
      <Frame>
        {
          windowType === 'login' ? (
            <LoginPage />
          ) : windowType === 'start' ? (
            <StartPage />
          ) : windowType === 'workspace' ? (
            <WorkspacePage />
          ) : (
            <ErrorPage />
          ) // todo : this is actually deprecated
        }
      </Frame>
    </>
  )
}
