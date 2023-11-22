import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'

const CreateCategory = () => {
    const [categories,setCategories] =useState([])
    const [name,setName]= useState("")
    const [open,setIsOpen] =useState(false)
    const [selected,setSelected]= useState(null)
    const [updateName,setUpdateName]=useState('')

    //handle Form
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post(`http://localhost:5000/api/v1/category/create-category`,{name})
            if(data?.success){
                toast.success(data.message)
                getAllCategories()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong in input form")
        }
    }

    //get all categories
    const getAllCategories = async() =>{
        try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getallcategories`)
          if(data?.success){
            setCategories(data?.category)
          }  
        } catch (error) {
            console.log(error)
            toast.error("something went wrong in getting category")
        }
    }

    useEffect(()=>{
        getAllCategories()
    },[])

    //update category
    const handleUpdate = async(e)=>{
        e.preventDefault()
        try {
           const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updateName})
           if(data.success){
            toast.success(data.message)
            setSelected(null)
            setUpdateName("")
            setIsOpen(false)
            getAllCategories()
           }else{
            toast.error(data.message)
           }
        } catch (error) {
            toast.error("something went wrong ")
        }
    }

    //delete category
    const handleDelete = async(id)=>{
    
        try {
           const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
           if(data.success){
            toast.success(data.message)
            getAllCategories()
           }else{
            toast.error(data.message)
           }
        } catch (error) {
            toast.error("something went wrong ")
        }
    }
  return (
    
     <Layout>
        <div className='container-fluid m-4 p-4'> 
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                <h1>Manage Category</h1>
                <div className='p-3 w-50'>
                  <CategoryForm  handleSubmit={handleSubmit} value={name} setValue={setName}/>
                </div>
                <div className='w-75'>
                <table class="table ">
                    <thead>
                        <tr>
                       
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                        </tr>
                   </thead>
                    <tbody>
                        {categories?.map((c) => (
                            <>
                                <tr key={c._id}>
                                <td>{c.name}</td>
                                
                                <td>
                                    <button className='btn btn-primary ms-2' 
                                    onClick={()=>{
                                        setIsOpen(true);
                                         setUpdateName(c.name);
                                         setSelected(c);
                                         }}>
                                    Edit
                                    </button>
                                <button className='btn btn-danger ms-2 ' 
                                onClick={()=>{
                                    handleDelete(c._id) }}
                                >
                                    Delete
                                    </button></td>
                                </tr>
                            </>
                           ))}
                       
                    </tbody>
                </table>
                </div>
                <Modal
                 onCancel={() => setIsOpen(false)}
                 footer={null}
                 open={open}
                >
                    <CategoryForm value={updateName} setValue={setUpdateName} 
                    handleSubmit={handleUpdate}/>
                </Modal>
                </div>
            </div>
        </div>
      </Layout>
  )
}

export default CreateCategory