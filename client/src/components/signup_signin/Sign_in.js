import React, { useState } from 'react'
import "./signup.css";
import { NavLink } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Sign_in = () => {
  // log data = inital value/ current value
  const [logdata, setdata] = useState({
    email: "",
    password: "",

  });
console.log(logdata);

  const addData = (e) => {
    const {name,value}=e.target;
    // console.log(e.target.value);
    setdata(()=>{
      return{
        ...logdata,
        [name]:value
      }
    })
  }

  const senddata=async(e)=>{
    e.preventDefault();

    const {email, password}= logdata;

    const res = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    const data = await res.json();
    console.log(data);

    
    if(res.status==400 || !data){
      console.log("invalid details")
        toast.warn('Invalid Details', {
          position: "top-center",
          });
    }else{
      console.log("Data successfully fetched");
        toast.success('Welcome to amazon ', {
          position: "top-center",
          });
      setdata({...logdata, email:"", password:""})
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
            <form methode="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="text"
                  onChange={addData}
                  value={logdata.email}
                  name='email' id='email' />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password"
                onChange={addData}
                value={logdata.password}
                placeholder='At least 6 character' name='password' id='password' />
              </div>
              <button className='signin_btn' onClick={senddata}>Continue</button>
              <p>By continuing, you agree to Amazon's <a href="">Conditions of Use</a> and <a href="">Privacy Notice</a>.</p>
            </form>
          </div>
          <div className="create-accountinfo">
            <p>──────────New to Amazon───────────</p>
            <NavLink to="/register"> <button>Create  Your Amazon Account</button></NavLink>

          </div>

        </div>
        <ToastContainer/>
      </section>
    </>
  )
}

export default Sign_in

