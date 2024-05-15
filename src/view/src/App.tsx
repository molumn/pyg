import { WorkspacePage } from './WorkspacePage'
import { ThemeProvider } from '@view/components/provider/ThemeProvider'

export default function App(): JSX.Element {
  return (
    <ThemeProvider>
      <WorkspacePage />
    </ThemeProvider>
  )
}
