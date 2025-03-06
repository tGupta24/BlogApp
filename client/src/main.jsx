import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";

import './index.css';

import App from './App.jsx';
import { About, Blog, Contact, Creators, Dashboard, Login, Register, SingleBlog } from './Pages/index.js';
import { AuthProvider } from './contextApi/AuthProvider.jsx';
import Home from './components/Home.jsx';

// Import Dashboard Pages
import { CreateBlog, Update, MyProfile, MyBlogs } from "./dashboard/index.js";

// Role-based Protected Route
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Public Routes */}
      <Route index element={<Home />} />

      <Route path='/home' element={<Home />} />
      <Route path='/blogs' element={<Blog />} />
      <Route path='/creators' element={<Creators />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/singleBlog/:id' element={<SingleBlog />} />


      {/* Dashboard Routes (Protected) */}
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path='create-blog' element={<CreateBlog />} />
        <Route path='my-blogs' element={<MyBlogs />} />
        <Route path='my-profile' element={<MyProfile />} />
        <Route path='update/:id' element={<Update />} />

      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
