import { useState } from 'react'
import Form from './components/Form'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import ViewData from './components/ViewData'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Form /> } />
        <Route path='/:id' element={ <Form /> } />
        <Route path='/view' element={ <ViewData /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
