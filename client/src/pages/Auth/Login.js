import React, { useState } from 'react';
import { Input } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Auth.css';
import { setAuthentication } from '../../components/auth/auth';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage, SuccessMessage } from '../../components/Messages/Messages';

export const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',

  });

  const { email, password } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }


  const onFinish = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    await axios.post('/api/users/login', { email, password }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setAuthentication(res.data, res.data.token);
        SuccessMessage(res.data.successMessage);
        props.history.push('/');
        window.location.reload();
      }
      else if (res.status === 201) {
        ErrorMessage(res.data.errorMessage);
      }
      else {
        ErrorMessage(res.data.errorMessage);
      }
    })

  };



  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {
        loading
          ?
          <Loading />
          :
          <>
            <div className='auth'>
              <div className='auth-inner'>
                <div className='text-center'>
                  <div className='header'>
                    <Link to="/">Countlori</Link>
                  </div>
                  <form onSubmit={onFinish} className='p-4'>
                    <div className="floating-label-group mb-3">
                      <Input name='email' onChange={handleChange} size='small' placeholder="Email or Username" prefix={<UserOutlined />} />
                    </div>
                    <div className="floating-label-group">
                      <Input.Password name='password' type='password' onChange={handleChange} size="small" placeholder="Password" prefix={<KeyOutlined />} />
                    </div>
                    <div className='submit-btn-container'>
                      <button type='submit' className='btn my-2 mt-3 w-100'>
                        Login
                      </button>
                    </div>
                  </form>
                  <div className='mt-2'>
                    <p>
                      New to <strong>Countlori?</strong> <Link to='/signup' className='pass'>Register</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </>

  );
}
