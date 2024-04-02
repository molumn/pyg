import { ReactNode } from "react";
import { selectWindowType } from "./store/state/window";
import { useAppSelector } from "./hooks";

import { LoginPage } from "./LoginPage";
import { StartPage } from "./StartPage";
import { WorkspacePage } from "./WorkspacePage";
import { ErrorPage } from "./ErrorPage";

export default function App(): ReactNode {
  const windowType = useAppSelector(selectWindowType)

  return (
    <>
      {
        windowType === 'login' ? <LoginPage /> :
          windowType === 'start' ? <StartPage /> :
            windowType === 'workspace' ? <WorkspacePage /> :
              <ErrorPage /> // todo : this is actually deprecated
      }
    </>
  )
}
