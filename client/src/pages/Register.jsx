import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "../api/axios.js";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", inputs);
      navigate('/login');
    } catch (err) {
      console.log(err);
     setError(err.response.date)
    }
  };
  
  return (
    <div className='auth'>
      <h1>Login</h1>

      <form className='auth__form'>
         <input className='auth__input' required type="text" placeholder='username'  name='username' onChange={handleChange}/>
         <input className='auth__input' required type="email" placeholder='email'onChange={handleChange} name='email'/>
         <input className='auth__input'required type="password" placeholder='password'onChange={handleChange} name='password'/>
         <button className='auth__btn' onClick={handleSubmit} >Register</button>
         {error && <p>{error}</p>}
         <span className='auth__footer'>Do you have account? <Link to={'/login'}>Login</Link> </span>
      </form>
      

    </div>
  )
}

export default Register