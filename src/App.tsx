import './App.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './routes/routes'
import AuthLoader from './pages/Auth/AuthLoader'

function App() {

  return (
    <>
    <AuthLoader>
      <RouterProvider router={router} />
    </AuthLoader>
    </>
  )
}

export default App
