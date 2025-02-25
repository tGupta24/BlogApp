import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { About, Blog, Contact, Creators, Dashboard, Login, Register } from './Pages/index.js'
import { AuthProvider } from './contextApi/AuthProvider.jsx'
import Home from './components/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/blogs' element={<Blog />} />
      <Route path='/home' element={<Home />} />
      <Route path='/' element={<Home />} />
      <Route path='/creators' element={<Creators />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />{/* there is not navbar and footer hide using location */}
      <Route path='/register' element={<Register />} />{/* there is not navbar and footer  hide using location  */}
      <Route path='/dashBoard' element={<Dashboard />} /> {/* there is not navbar and footer hide using location */}
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>,
)
