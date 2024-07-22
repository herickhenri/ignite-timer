import { CyclesContextProvider } from './contexts/cycles-context'
import { Routes } from './routes/routes'

export function App() {
  return (
    <>
      <CyclesContextProvider>
        <Routes />
      </CyclesContextProvider>
    </>
  )
}
