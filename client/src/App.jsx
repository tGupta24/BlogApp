import React from 'react'
import { Navbar, Footer } from './components/index.js'

import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './contextApi/AuthProvider'

function App() {
  const location = useLocation();
  /// ye jis bhi url pe he uski info deta hai let we are at https://localhost:2582/about then location.pathname = "/about" and much more 
  const hideNavFooter = ["/login", "/register", "/dashBoard"].includes(location.pathname); //true or false


  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Outlet />
      {!hideNavFooter && <Footer />}
    </>
  )
}

export default App
