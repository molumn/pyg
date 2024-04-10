import { ReactNode } from 'react'

import { LoginPage } from './LoginPage'
import { StartPage } from './StartPage'
import { WorkspacePage } from './WorkspacePage'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'

export default function App(): ReactNode {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/start'} element={<StartPage />} />
          <Route path={'/workspace'} element={<WorkspacePage />} />
          <Route path={''} element={''} />
        </Routes>
      </Router>
    </>
  )
}
