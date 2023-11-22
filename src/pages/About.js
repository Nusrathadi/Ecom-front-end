import React from "react";
import Layout from "../components/Layout/Layout";

 const About = () =>{
    return(
        <>
          <Layout>
            <div className="row about-us  ">
              <img
              src="/images/bg.jpg"
              alt="about us"
              style={{width:'100%',height:'70vh'}}
              />
              <div className="row about-info pt-4 ms-4">
                
                <div className="col-md-6 p-5 ms-5 ">
                  <h1 className="pt-4  ">ABOUT OUR WATCH</h1>
                  <p className="justify-text pt-4 fs-6"> We sell 100% original and branded watches & provide one year warranty.
                  We deliver your favorite watch at your door step in Pakistan. We offer delivery to any location in Pakistan, where courier service is present. We also offer cash on delivery payment method, allowing you to pay for your watch once you’ve receive the order. We also provide standard warranty for the watches as well.
                  </p>

                </div>
                <div className="col-md-5 ">
                  <img
                  src="/images/about.png"
                  alt="about us"
                  style={{width:'100%',height:'400px'}}
                  />

                </div>
                  
              </div>

            </div>
          </Layout>
        </>
    )
}
export default About