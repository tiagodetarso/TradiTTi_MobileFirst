// eslint-disable-next-line no-unused-vars
import React from 'react'
import  { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

//styles
import { AppWrap } from './appStyles'

//pages
import Home from './pages/home'
import Menu from './pages/menu'
import Order from './pages/order'
import Product from './pages/product'

//components
import Header from './components/header'
import Footer from './components/footer'

export default function App() {

  const selectedProduct = useSelector((state) => state.selected.product)

  return (
    <Router>
      <AppWrap>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route
            path="/product"
            element={selectedProduct ? <Product /> : <Navigate to="/menu" />}
          ></Route>
          <Route path="/order" element={<Order />}></Route>
        </Routes>
        <Footer />
      </AppWrap>
    </Router>
  )
}
