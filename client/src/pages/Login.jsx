import React, { useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {currentUser, login} = useContext(AuthContext);

  // console.log(currentUser);

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    //   await axios.post("http://localhost:8800/api/auth/login", inputs, {
    //     withCredentials: true,
    //     headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
    // }})
      navigate('/');
    } catch (err) {
      console.log(err);
     setError(err.response.date)
    }
  };


  return (
    <div className='auth'>
      <h1>Login</h1>

      <form className='auth__form'>
         <input className='auth__input' type="text" placeholder='username' name='username' onChange={handleChange}/>
         <input className='auth__input' type="password" placeholder='password'name='password' onChange={handleChange}/>
         <button className='auth__btn' onClick={handleSubmit}>Login</button>
         <span className='auth__footer'>Don't you have account? <Link to={'/register'}>Register</Link> </span>
      </form>
      

    </div>
  )
}

export default Login