import React from 'react'
import { Navbar, Footer } from './components/index.js'

import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './contextApi/AuthProvider'
import { useEffect } from 'react'

function App() {
  const location = useLocation();
  /// ye jis bhi url pe he uski info deta hai let we are at https://localhost:2582/about then location.pathname = "/about" and much more 
  const hideNavFooter = ["/login", "/register"].includes(location.pathname); //true or false
  const isDashboard = location.pathname.startsWith("/dashboard");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!hideNavFooter && !isDashboard && <Navbar />}
      <Outlet />
      {!hideNavFooter && !isDashboard && <Footer />}
    </>
  )
}

export default App
