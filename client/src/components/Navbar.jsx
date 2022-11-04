import React from 'react';
import { AuthContext } from '../context/authContext.js';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import { useContext } from 'react';

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  return ( 
    <div className='navbar' >
        <div className="navbar__logo">
          <Link to='/' >
          <img src={Logo} alt="logo" />
          </Link>          
        </div>
        <div className="navbar__links">
          <Link className='link' to='/?cat=art'>
           <h5>ART</h5> 
          </Link>
          <Link className='link' to='/?cat=science'>
           <h5>SCIENCE</h5> 
          </Link>
          <Link className='link' to='/?cat=technology'>
           <h5>TECHNOLOGY</h5> 
          </Link>
          <Link className='link' to='/?cat=cinema'>
           <h5>CINEMA</h5> 
          </Link>
          <Link className='link' to='/?cat=design'>
           <h5>DESIGN</h5> 
          </Link>
          <Link className='link' to='/?cat=food'>
           <h5>FOOD</h5> 
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout} >Logout</span> : <Link className='link' to='/login' >Login</Link> }
          <span className="write">
            <Link className='link' to='/write'>Write</Link>
          </span>
        </div>
    </div>

  )
}

export default Navbar