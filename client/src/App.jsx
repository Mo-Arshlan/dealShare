import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminRoute from './Components/Routes/AdminRoutes'
import Products from './pages/Admin/Products'
import Categories from './pages/Admin/Categories'
import Users from './pages/Admin/Users'
import Admins from './pages/Admin/Admins'
import Register from './pages/Auth/Register'
import WildPage from './pages/WildPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/User/Profile'
import Private from './Components/Routes/Private'
import Favorites from './pages/User/Favorites'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        <Route path='/dashboard' element={<Private />}>
          <Route path="user/profile" element={<Profile/>} />
          <Route path="user/favorites" element={<Favorites/>} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/products/:id' element={<Products />} />
          <Route path='admin/categories' element={<Categories />} />
          <Route path='admin/categories/:id' element={<Categories />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/admins' element={<Admins />} />
        </Route>
        <Route path='/*' element={<WildPage/>} />
      </Routes>
      
    </>
  )
}

export default App
