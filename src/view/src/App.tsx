import React from 'react'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import { LoginPage } from './LoginPage'
import { StartPage } from './StartPage'
import { WorkspacePage } from './WorkspacePage'

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/start'} element={<StartPage />} />
        <Route path={'/workspace'} element={<WorkspacePage />} />
        <Route path={''} element={''} />
      </Routes>
    </Router>
  )
}
