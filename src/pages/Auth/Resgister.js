import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast  from 'react-hot-toast';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/userStyle.css'

const Register = () => {
    const[firstName,setFirstName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[phone,setPhone]=useState('')
    const[address,setAddress]=useState('')
    const navigate=useNavigate()



    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/register`, {
            firstName,
            email,
            password,
            phone,
            address,
            
          });
          if (res && res.data.success) {
            toast.success( res.data.message);
            navigate("/login");
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
         <h4 className='title'>REGISTER FORM</h4>
            <div>
            <div className="mb-3">
                <input type="text" className="form-control" id="inputName" placeholder='Enter Your Name'  value={firstName} onChange={(e)=>setFirstName(e.target.value)} autoComplete="firstName" required/>
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" id="email" placeholder='Enter Your Email' value={email}  onChange={(e)=>setEmail(e.target.value)} autoComplete="email" required/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder='Enter Password' value={password}  onChange={(e)=>setPassword(e.target.value)}  required/>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" id="phone" placeholder='Enter Your Phone' value={phone}  onChange={(e)=>setPhone(e.target.value)} autoComplete="phone" required/>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" id="address" placeholder='Enter Your Address' value={address}  onChange={(e)=>setAddress(e.target.value)} autoComplete="address" required/>
            </div>
            
            <button type="submit" className="btn btn-primary">REGISTER</button>
            </div>
        </form>


       </div>
   </Layout>
  )
}

export default Register