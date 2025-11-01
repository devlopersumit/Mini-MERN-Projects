import React from 'react'
import { AuthProvider } from './context/authContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/signup' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
