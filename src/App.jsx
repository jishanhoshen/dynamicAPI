import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Route, RouterProvider, Routes } from 'react-router-dom'
import ApiList from './ApiList'
import ApiData from './ApiData'
import AddApi from './AddApi'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ApiList />} />
        <Route path='/add' element={<AddApi />} />
        <Route path='/:url' element={<ApiData />} />
      </Routes>
    </>
  )
}

export default App
