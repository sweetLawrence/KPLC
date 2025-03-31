import './App.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Pages/Login'
import PrivateRoute from './Components/Pages/PrivateRoute'
import LandingPage from './Components/Pages/LandingPage'
import LandingPagexx from './Components/Pages/LandingPagexx'
import CancelPermit from './Components/Pages/CancelPermit'

const theme = createTheme({})
function App () {


  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/land' element={<LandingPagexx />} />
            <Route path='/cancel-permit' element={<CancelPermit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
