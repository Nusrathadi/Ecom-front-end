import React from "react";
import Layout from "../components/Layout/Layout";
import {MdEmail} from 'react-icons/md'
import {IoIosPhonePortrait} from 'react-icons/io'
import {GrLocation} from 'react-icons/gr'

 const Contact = ()=>{
    return(
        <>
          <Layout>
             <div className="row contact-us text-center">
                <img
                  src="/images/bg.jpg"
                  alt="about us"
                  style={{width:'100%',height:'74vh'}}
                  />
                  <div className="row contact-info ms-5">

                    <div className=" col-md-6 ms-2">
                      <img
                      src="images/contact.jpg"
                      alt="contact us"
                      style={{width:'90%',height:'270px'}}
                      />
                    </div>
                    <div className="col-sm col-md-4 ">
                      <h1 className="bg-dark p-3 text-white text-center">CONTACT US</h1>
                      <p className="text-justify text-center mt-2">
                        Any query and info related to product feel free to call anytime 24x7
                      </p>
                      <p className="mt-3 text-center">
                        <MdEmail className="m-2 "/> : helpecom94@gmail.com
                      </p>
                      <p className="mt-3 text-center">
                        <IoIosPhonePortrait className="m-2 "/> : +92-303-1234567
                      </p>
                      <p className="mt-3 text-center">
                        <GrLocation className="m-2 "/> : Address
                      </p>

                    </div>
                  </div>

             </div>
          </Layout>
        </>
    )
}

export default Contact