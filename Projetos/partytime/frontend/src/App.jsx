import './App.css'

import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/ReactToastify.css'

function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default App
