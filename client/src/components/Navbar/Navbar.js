import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/auth';
import './Navbar.css';
import { UserOutlined } from '@ant-design/icons/lib/icons';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import UnorderedListOutlined from '@ant-design/icons/lib/icons/UnorderedListOutlined';

export const Navbar = () => {
  return (
    <div className='main-nav'>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Countlori</Link>
        <div>
          <ul className="d-flex gap-2 align-items-center ml-auto mr-5 list-unstyled pt-3">
            <li className='nav-item profile text-center mx-2'>
              <Link to='/presets'>
                <UnorderedListOutlined />
              </Link>
            </li>
            <li className='nav-item profile text-center'>
              {
                isAuthenticated() ?
                  <a href='/login' onClick={() => logout(() => { })}>
                    <LogoutOutlined />
                  </a>
                  :
                  <Link to='/login'>
                    <UserOutlined />
                  </Link>
              }

            </li>
          </ul>
        </div>
      </nav >
    </div >
  )
}
