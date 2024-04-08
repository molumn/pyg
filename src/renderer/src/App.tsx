import { ReactNode } from 'react'
import { selectWindowType } from './store/state/window'
import { useAppSelector } from './hooks'

import { LoginPage } from './LoginPage'
import { StartPage } from './StartPage'
import { WorkspacePage } from './WorkspacePage'
import { ErrorPage } from './ErrorPage'

import { TitleBarSection } from './components/TitleBar'
import GrowingDiv from './components/base/GrowingDiv'

export default function App(): ReactNode {
  const windowType = useAppSelector(selectWindowType)

  return (
    <>
      {windowType !== 'login' ? (
        <TitleBarSection>
          <div className={'w-[135px]'}>left</div>
          <GrowingDiv />
          <div className={'justify-self-center self-center'}>center</div>
          <GrowingDiv />
          <div className={'justify-self-center self-center'}>right</div>
        </TitleBarSection>
      ) : (
        <TitleBarSection className={'bg-transparent'} />
      )}
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
    </>
  )
}
