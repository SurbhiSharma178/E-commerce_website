import React, { useState } from 'react'
import "./signup.css";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const [userdata,setUdata]=useState({
    fname:"",
    email:"",
    mobile:"",
    password:"",
    confirm_password:""
  });
  console.log(userdata);


const addData =(e)=>{
  const {name,value}=e.target;

  setUdata(()=>{
    return{
      ...userdata,
      [name]:value
    }
  })
}

const sendData = async(e)=>{
  e.preventDefault();
  const {fname, email, mobile, password, confirm_password} = userdata

  const res = await fetch("/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      fname, email, mobile, password, confirm_password
    })
  });
  const data = await res.json();
  // console.log(data);


  if(res.status===422 || !data){
    // alert("No Data")
    toast.warn('Invalid Details', {
      position: "top-center",
      });
  }else{
    // alert("Data successfully added")
    toast.success('Data Sucessfully Added', {
      position: "top-center",
      });

    setUdata({...userdata, fname:"", email:"", mobile:"", password:"", confirm_password:""})
  }
}
  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazon logo" />
          </div>
          <div className="sign_form">
            <form method='POST'>
              <h1>Sign-Up</h1>
              <div className="form_data">
                <label htmlFor="fname">Your Name</label>
                <input type="text" 
                onChange={addData}
                value={userdata.fname}
                name='fname' id='fname' />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="text"
                onChange={addData}
                value={userdata.email}
                name='email' id='email' />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile no.</label>
                <input type="number" 
                onChange={addData}
                value={userdata.mobile}
                name='mobile' id='mobile' />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password" 
                onChange={addData}
                value={userdata.password}
                placeholder='At least 6 character' name='password' id='password'/>
              </div>
              <div className="form_data">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" 
                onChange={addData}
                value={userdata.confirm_password}
                placeholder='At least 6 character' name='confirm_password' id='confirm_password'/>
              </div>
              <button className='signin_btn'onClick={sendData}>Continue</button>
              <p>By continuing, you agree to Amazon's <a href="">Conditions of Use</a> and <a href="">Privacy Notice</a>.</p>
            </form>
          </div>
          <div className="create-accountinfo">
            <p>Already have an account?  <NavLink to="/login">signin</NavLink></p>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  )
}

export default SignUp
