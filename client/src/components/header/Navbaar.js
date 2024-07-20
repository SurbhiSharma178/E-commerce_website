import { React, useContext, useEffect } from 'react'
import "./navbaar.css";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Options from "./Options";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink } from 'react-router-dom';
// import { colors } from '@mui/material';
// import Dropdown from './Dropdown.js';
import { LoginContext } from '../context/ContextProvider';


const Navbaar = () => {
  const { account, setAccount } = useContext(LoginContext);
  // console.log(account)
  // console.log(account.carts.length);

  const getdetailValidUSer= async()=>{
    const res = await fetch("/validUser",{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    })

    const data= await res.json();
    console.log(data);

    if(res.status!==201){
      console.log("Error ");
    }else{
      console.log("Data valid");
      setAccount(data);
    }
  }

  useEffect(()=>{
    getdetailValidUSer()
  },[])


  return (
    <>

      <header>
        <nav>
          <div className="left">
            <NavLink to="/"><img src="./amazon_logo.png" alt="amazon logo" /></NavLink>
            <div className="location">
              <span>Delivering to location</span>
              <p>
                <LocationOnOutlinedIcon />
                <strong>Update Location </strong></p>
            </div>
            <Options />
            <input type="text" placeholder='Search Amazon.in' />
            <div className="search_icon"><SearchIcon /></div>

            <div className="right">
              <div className="language">
                <img src="./icons8-india-48.png" alt="" />
                <span>EN</span>
              </div>
              <div className="sign_in">
                {/* <Dropdown /> */}
                <NavLink to='/login'>
                  <span>Hello, sign in </span>
                  <p><strong>Account & Lists</strong></p>
                </NavLink>


              </div>
              <div className="return">
                <span>Return</span><br />
                <span><strong>& Order</strong></span>
              </div>
              <div className="cart_btn">
                {
                  account?<NavLink to="/buynow">
                  <Badge badgeContent={account.carts?.length || 0} color='primary'>
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                  cart
                  </NavLink>:
                <NavLink to="/login">
                <Badge badgeContent={0} color='primary'>
                  <ShoppingCartOutlinedIcon />
                </Badge>
                cart
                </NavLink>
                }
              </div>

            </div>
          </div>
        </nav>
      </header>

    </>
  )
}

export default Navbaar
