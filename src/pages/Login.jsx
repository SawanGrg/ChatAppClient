import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { setUserDetails } from '../../src/redux/user/userSlice';
import { postLoginData } from '../../src/services/user/LoginAPI';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log(userName, password);

    if (userName === '' || password === '') {
      toast.error('Please fill username and password fields');
      return;
    }

    try {
      const endpoint = 'login';
      const body = {
        username: userName,
        password: password,
      };

      // Call the postLoginData function with the correct arguments
      const response = await postLoginData(endpoint, body);

      console.log("success", response);
      console.log("1");
      console.log("response", response.username, response.token, response.roleName);
      if (response.status === 'UNAUTHORIZED') {
        // Display an error toast for unauthorized access
        toast.error('Please check your credentials.');
        return;
      }

      if (response.token == "vendor is not verified") {
        toast.error('Vendor is not verified');
        return;
      }

      if (response.token == "user is not verified") {
        toast.error('User is not verified');
        return;
      }
      
      if (!response.username) {
        toast.error('Invalid Credentials');
        return;
      }
      console.log("2");

      if (response.username) {

        dispatch(setUserDetails({ token: response.token, userName: response.username, userId: response.roleName }));

        // Redirecting based on the role
        if (response.roleName === "ROLE_VENDOR") {
          navigate('/vendor');
        } else if (response.roleName === "ROLE_USER") {
          navigate("/");
        } else {
          navigate('/admin/home');
        }

      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
        <div className="loginForm">
          <Toaster
            position='top-center'
            toastOptions={{
              duration: 3000,
            }}
          />


          <div> 
            <img
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

              alt='user-register'
              className='user-register-image'
            />
          </div>


          <div className="login">
              <div className='login-title'>
                <h1>Namastey and Welcome to Sawan Chat</h1>
              </div>

              <form onSubmit={handleSubmit} className='user-register-form'>
                <div className='p'>
                  <label className='user-login-label'>User Name</label>
                  <br />
                  <input
                    type='text'
                    placeholder='eg : Sxxxxx'
                    className='user-login-input'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className='password' >
                  <label className='user-login-label'>Password</label>
                  <br />
                  <input
                    type='password'
                    placeholder='eg : xxxxxx'
                    className='user-login-input-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>


                

                <div>
                <button
                  className='user-register-button'
                  type='submit'
                >
                  Login 
                </button>
              </div>
              </form>

              <div>
                <div className='register-contract'>
                  Dont have an account? <Link to='/userRegistration' className='login-link'><span class="underline">Register</span></Link>
                </div>
                <div className='register-contract'>
                  For any queries, contact us at <Link to='/contact' className='login-link'><span class="underline">Contact</span></Link>
                </div>
              </div>
          </div>  


        </div>
  );
}
