import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Detalles from './pages/Detalles'
import Footer from './components/Footer'
import Tendencias from './pages/Tendencias'
import Categorias from './pages/Categorias'
import Peliculas from './pages/Peliculas'

const App = () => {
  return (
    <BrowserRouter>
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Inicio/>} />
        <Route path='inicio' element={<Inicio/>} />
        <Route path='detalle/:id/:titulo' element={<Detalles/>} />
        <Route path='tendencias/:id' element={<Tendencias/>} />
        <Route path='categorias/:id/:tipo' element={<Categorias/>} />
        <Route path='peliculas' element={<Peliculas/>} />
        <Route path='*' element={<Inicio/>} />
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App