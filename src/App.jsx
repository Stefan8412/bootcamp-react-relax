import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Offers } from './pages/Offers'
import { OfferSingle } from './pages/OfferSingle'
import { Cart } from './pages/Cart'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/offers/:id" element={<OfferSingle />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<>404</>} />
    </Routes>
  )
}

export default App
