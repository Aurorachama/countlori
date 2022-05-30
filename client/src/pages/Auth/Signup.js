import React, { useState } from 'react';
import { Form, Input } from 'antd';
import axios from 'axios';
import { ContactsOutlined, KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SuccessMessage, ErrorMessage } from '../../components/Messages/Messages';
import { Loading } from '../../components/Loading/Loading';
import './Auth.css';


export const Signup = (props) => {
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confimPassword: ''
  });

  const { fullName, username, email, password } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }


  const onFinish = async (e) => {
    window.scrollTo(0, 0);
    setLoading(true);
    await axios.post('/api/users/signup', { fullName, username, email, password }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        SuccessMessage(res.data.successMessage);
        setTimeout(() => {
          props.history.push('/login')

        }, 2000);
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
    <div>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      {
        loading
          ?
          <Loading />
          :
          <>
            {
              <div className='auth signup'>
                <div className='auth-inner'>
                  <div className='text-center'>
                    <div className='header'>
                      <Link to="/">Countlori</Link>
                    </div>
                    <Form
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      className='p-4'
                    >
                      <div className="floating-label-group">
                        <Form.Item
                          name="Full Name"
                          rules={[{ required: true, message: 'Please input your Full Name!' }]}
                        >
                          <Input name='fullName' onChange={handleChange} size='small' placeholder="Full Name" prefix={<ContactsOutlined />} />
                        </Form.Item>
                      </div>
                      <div className="floating-label-group">
                        <Form.Item
                          name="username"
                          rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                          <Input name='username' type='text' onChange={handleChange} size="small" placeholder="Username" prefix={<UserOutlined />} />
                        </Form.Item>
                      </div>
                      <div className="floating-label-group">
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ]}
                        >
                          <Input name='email' onChange={handleChange} size='small' placeholder="Email" prefix={<MailOutlined />} />
                        </Form.Item>
                      </div>
                      <div className="floating-label-group">
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password type='password' name='password' onChange={handleChange} size="small" placeholder="Password" prefix={<KeyOutlined />} />
                        </Form.Item>
                      </div>
                      <div className="floating-label-group">
                        <Form.Item
                          name="confirm"
                          dependencies={['password']}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords don't match!"));
                              },
                            }),
                          ]}
                        >
                          <Input.Password name='confimPassword' onChange={handleChange} size='small' placeholder="Re-Enter Password" prefix={<KeyOutlined />} />
                        </Form.Item>
                      </div>
                      <div className='submit-btn-container'>
                        <button type='submit' className='btn my-2 mt-3 w-100'>
                          Create Account
                        </button>
                      </div>
                    </Form>
                    <div>
                      <p>
                        Already Have Account? <Link to='/login' className='pass'>Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </>
      }
    </div>
  );
};
