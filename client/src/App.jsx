import React from 'react'
import { Navbar, Footer } from './components/index.js'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const location = useLocation()
  const hideNavFooter = ["/login", "/register"].includes(location.pathname)
  const isDashboard = location.pathname.startsWith("/dashboard")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (hideNavFooter || isDashboard) {
    // For pages where you want no Navbar or Footer, render Outlet alone
    return <Outlet />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* This will make Outlet take available space and push footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
