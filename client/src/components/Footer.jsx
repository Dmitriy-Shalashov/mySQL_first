import React from 'react';
import Logo from '../img/logo.png';


const Footer = () => {
  return (
      <div className='footer'>
        <img className='footer__img' src={Logo} alt="logo" />
        <span>Made with React.js</span>
    
    </div>
    
  )
}

export default Footer