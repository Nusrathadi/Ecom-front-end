
import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import {toast}  from 'react-hot-toast';
import axios from 'axios'
import {useNavigate , useLocation} from 'react-router-dom'
import '../../styles/userStyle.css'
import { useAuth } from '../../context/Auth';

const Login = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate()
    const location=useLocation()
    const [auth,setAuth]= useAuth('')

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/login`, {
            email,
            password,
            
          });
          if (res && res.data.success) {
            toast.success( res.data.message);
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state || "/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
  return (
    <Layout>
       <div className='form-container'>
        
         <form onSubmit={handleSubmit}>
         <h4 className='title'>LOGIN HERE</h4>
            <div>
        
            <div className="mb-3">
                <input type="email" className="form-control" id="email" placeholder='Enter Your Email' value={email}  onChange={(e)=>setEmail(e.target.value)} autoComplete="email" required/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder='Enter Password' value={password}  onChange={(e)=>setPassword(e.target.value)}  required/>
            </div>
           
            
            <button type="submit" className="btn btn-primary">LOGIN</button>
            </div>
        </form>


       </div>
   </Layout>
  )
}

export default Login