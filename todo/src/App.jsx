import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './composant/login'
import Registrer from './composant/registrer'
import Todolist from './composant/todolist'
import {Route , Routes , BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Registrer />} />
      <Route path='/login' element={<Login />} />
      <Route path='/todolist/:id' element={<Todolist />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
