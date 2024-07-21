import React, { useContext } from 'react'
import {Avatar, Divider} from '@mui/material'
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import "./leftheader.css";

const Leftheader = ({LogClose}) => {

  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="leftheader">
        <div className="left_nav">
          {
            account ? <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar> :
              <Avatar className="avtar"></Avatar>
          }
          {account ?<h3>Hello,{account.fname.toUpperCase()}</h3>:<h3>Hello,sign in</h3>}
          
        </div>

        <div className="nav_btn" onClick={()=>LogClose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By Category</NavLink>
          <NavLink to="/">Today's Deal</NavLink>
          {
            account ?<NavLink to="/buynow">Your Orders</NavLink>:<NavLink to="/login">Your Order</NavLink>
          }
           <Divider style={{width:"100%",marginTop:"0px"}}/>

           <h4>Help & Setting</h4>

          <div className="flag">
            <NavLink to="/">Your Account</NavLink>
            {
              account ?<NavLink style={{marginTop:"-14px",marginLeft:"-18px"}}><LogoutIcon style={{marginRight:"2px"}}/>Sign Out</NavLink>:
              <NavLink to="/login" style={{marginTop:"-8px",marginLeft:"-40px"}}>Sign In</NavLink>
            }
            
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Leftheader
