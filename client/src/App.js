import './App.css';
import Navbaar from './components/header/Navbaar';
import Maincomp from './components/home/Maincomp';
import Newnav from './components/newnav/Newnav';
import Footer from './components/footer/Footer';
import SignUp from './components/signup_signin/SignUp';
import Sign_in from './components/signup_signin/Sign_in';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import SecondslideCart from './components/cart/SecondslideCart';


import { Routes , Route} from 'react-router-dom';
function App() {
  return (
    <>
     <Navbaar/>
     <Newnav/>
     <Routes>
      <Route path='/' element={<Maincomp/>}/>
      <Route path='/login' element={<Sign_in/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/getproductsone/:id' element={<Cart/>}/>
      <Route path='/getproductstwo/:id' element={<SecondslideCart/>}/>
      <Route path='/buynow' element={<Buynow/>}/>
     </Routes>
     {/* <Maincomp/> */}
     <Footer/>
     
    </>
  );
}

export default App;
