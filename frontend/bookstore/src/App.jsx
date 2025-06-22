import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home";
import AllBooks from "./components/Pages/AllBooks";
import LogIn from "./components/Pages/LogIn";
import SignUp from "./components/Pages/SignUp";
import Cart from "./components/Pages/Cart";
import Profile from "./components/Pages/Profile";
import AboutUs from "./components/Pages/AboutUs";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import AllOrders from "./components/Pages/AllOrders";
import AddBook from "./components/Pages/AddBook";
import { Routes, Route } from "react-router-dom";
import {authActions} from "/src/store/auth";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import Success from "./components/Pages/Success";
import Cancel from "./components/Pages/Cancel";

const App = ()=> {
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")

    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));

    }
  },[])
  return (
    <>
      
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/all-books" element={<AllBooks />} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/profile" element={<Profile />} >
          {role==="user" ? <Route index path="/profile/Favourites" element={<Favourites/>}/>: <Route index path="/profile/All-Orders" element={<AllOrders />} /> }
          {role==="admin"&& <Route exact path="/profile/AddBook" element={<AddBook />} />}
          <Route exact path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route exact path="/profile/settings" element={<Settings />} />
          
          
          </Route>
          <Route exact path="/success" element={<Success />} />
<Route exact path="/cancel" element={<Cancel />} />
          <Route exact path="/LogIn" element={<LogIn />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/About-Us" element={<AboutUs />} />
          <Route exact path="view-book-details/:id" element={<ViewBookDetails/>} />
        </Routes>
        <Footer />

    </>
  );
}

export default App;
