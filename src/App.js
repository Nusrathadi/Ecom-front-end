import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/HomePage.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'
import Policy from './pages/Policy.js'
import  Pagenotfound from './pages/Pagenotfound.js';
import Register from './pages/Auth/Resgister.js';
import Login from './pages/Auth/Login.js';
import Dashboard from './pages/user/Dashboard.js'
import PrivateRoute from './components/Layout/Routes/privateRoute.js';
import AdminRoute from './components/Layout/Routes/AdminRoute.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import CreateCategory from './pages/Admin/CreateCategory.js';
import CreateProduct from './pages/Admin/CreateProduct.js';
import Users from './pages/Admin/Users.js';
import Orders from './pages/user/Orders.js';
import Profile from './pages/user/Profile.js';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js';
import Search from './pages/Search.js';
import ProductDetails from './pages/ProductDetails.js';
// import Categories from './pages/Categories.js';
import CartPage from './pages/CartPage.js';


function App() {
  return (
    <>
     <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:slug' element={<ProductDetails/>}/>
          {/* <Route path='/categories' element={<Categories/>}/> */}
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile/>} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>} />
            <Route path="admin/create-category" element={<CreateCategory/>} />
            <Route path="admin/create-product" element={<CreateProduct/>} />
            <Route path="admin/product/:slug" element={<UpdateProduct/>} />
            <Route path="admin/products" element={<Products/>} />
            <Route path="admin/users" element={<Users/>} />
          </Route>
          <Route path='/register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/about' element={< About/>}/>
          <Route path='/contact' element={< Contact/>}/>
          <Route path='/policy' element={< Policy/>}/>
          <Route path='*' element={<Pagenotfound/>}/>
     </Routes>      
    </>
  );
}

export default App;