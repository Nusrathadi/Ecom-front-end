import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const params= useParams()
  const [product , setProduct] = useState({})
 // const [relatedProduct , setRelatedProduct] = useState([])
  //get product
  const getProduct = async(req,res)=>{
    try {
      const {data}= await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
        setProduct(data?.products)
        //getSimilarPrduct(data?.product._id,data?.product.category._id)

    } catch (error) {
      console.log(error)
    }
  }
  //initial details
  useEffect(()=>{
    if(params?.slug) getProduct()
  },[params?.slug])

//  get similar product
  // const getSimilarPrduct = async(req,res)=>{
  //   try {
  //     const {data}= await axios
  //     .get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
  //     setRelatedProduct(data?.products)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

return (
    <Layout>
        <div className="row container product-details mt-2">
              <div className="col-md-6">
              <img src={`
                    ${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top" alt={product.name} height="370"
                      width={"350px"} />
              </div>
              <div className="col-md-6 text-center mt-5">
                <h1 className="text-center ">Product Details</h1>
                <h6>Name : {product.name}</h6>
                <h6>Description : {product.description}</h6>
                <h6>Price : {product.price}</h6>
                {/* {<h5>Category :{product.category.name} </h5>} */}
               <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                </div>
        </div>
        <div className="row">
        {/* <h1>{JSON.stringify(relatedProduct,null,4)}</h1> */}
        </div>
    </Layout>
  )
}

export default ProductDetails