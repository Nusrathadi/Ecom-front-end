import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox , Radio } from 'antd';
import { Prices } from '../components/prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';

 const Home=()=>{
   
    const [products,setProducts] = useState([])
    const [categories,setCategories] = useState([])
    const [checked,setChecked] = useState([])
    const [radio,setRadio] = useState([])
    const [total,setTotal] = useState(0)
    const [page,setPage]  = useState(1)
    const [loading,setLoading] = useState(false)
    const [cart, setCart] = useCart()
    const navigate = useNavigate()


     //get all categories
     const getAllCategories = async() =>{
        try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getallcategories`)
          if(data?.success){
            setCategories(data?.category)
          }  
        } catch (error) {
            console.log(error)
           
        }
    }

    useEffect(()=>{
        getAllCategories()
        getTotal()
        //eslint-disable-next-line
    },[])

    //get product
    const getAllProducts = async() =>{
        try{
            setLoading(true)
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts(data.products) 
        }catch(error){
          console.log(error)
        
        }
    }
    
     //getTotal count
     const getTotal = async()=>{
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-count`)
                setTotal(data?.total)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
       if(page === 1) return
       loadMore()
    },[page])

    //load more
    const loadMore = async() =>{
        try {
            setLoading(true)
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products,...data?.products])
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    

    //filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
          all.push(id);
        } else {
          all = all.filter((c) => c !== id);
        }
        setChecked(all);
      };
      useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
      }, [checked.length, radio.length]);
    
      useEffect(() => {
        if (checked.length || radio.length) filterProduct();
      }, [checked, radio]);
    
      //get filterd product
      const filterProduct = async () => {
        try {
          const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
            checked,
            radio,
          });
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };
    return(
        <>
          <Layout>
              <div className='row mt-3'>
                 <div className='col-md-3'>
                    <h4 className='text-center'>Filter by category</h4>
                     <div className="d-flex flex-column m-5">
                        {categories?.map(c =>(
                            <Checkbox key={c._id} 
                               onChange = {(e) => handleFilter(e.target.checked,c._id)}>
                                {c.name}
                            </Checkbox>
                         ))}
                     </div>
                        
                  {  /* price filter */}
                     <h4 className='text-center mt-4'>Filter by Price</h4>
                     <div className="d-flex flex-column m-5">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>  
                                  
                            ))}
                        </Radio.Group>
                     </div>

                     <div className="d-flex flex-column m-5">
                        <button className='btn btn-danger w-150' 
                           onClick={() =>window.location.reload()}>
                            RESET FILTERS
                        </button>
                     </div>

                 </div>
                 <div className='col-md-9'>
                    
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                    {products?.map(p =>(
                    
                        <div className="card m-2" style={{width: '18rem'}} >
                           <img src={
                           `${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                             <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0,27)}...</p>
                                <p className="card-text">$ {p.price}</p>
                                <button class="btn btn-primary ms-1" onClick={()=>
                                          navigate(`/product/${p.slug}`)}>
                                        More Details
                                        </button>
                                <button class="btn btn-secondary ms-1"
                                 onClick={()=>{setCart([...cart,p])
                                 toast.success('Item Added to cart')
                                }}
                                 >
                                    ADD TO CART
                                </button>
                             </div>
                        </div>
                       ))}
                    </div>
                    <div className='m-2 p-3 '>
                        {products && products.length < total && (
                            <button className='btn btn-warning'
                            onClick={(e)=>{
                                e.preventDefault()
                                setPage(page+1)
                            }}>
                                {loading ? "loading..." : "Next page"}
                            </button>
                        )}
                        </div>
                 </div>
              </div>
          </Layout>
        </>
    )
};

export default Home;