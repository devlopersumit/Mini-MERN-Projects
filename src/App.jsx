import React from 'react'
import { AuthProvider } from './context/authContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Write from './pages/Write'
import SinglePost from './pages/SinglePost'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path = '/write' element= {<Write/>} />
        <Route path='/singlepost' element={<SinglePost/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
