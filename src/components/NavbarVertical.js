import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import { AuthContext } from '../context/authContext';

const NavbarVertical = props => {
  const authContext = useContext(AuthContext);

  const [isBiggerWindow, setIsBiggerWindow] = useState(
    window.innerWidth > 1140
  );
  const [isSmallerWindow, setIsSmallerWindow] = useState(
    window.innerWidth > 600
  );

  const handleResize = useCallback(() => {
    setIsBiggerWindow(window.innerWidth > 1140);
    setIsSmallerWindow(window.innerWidth > 600);
  }, []);

  const logout = async () => {
    try {
      await authContext.logout();
    } catch (err) {
      // connection error
      console.log('D:', err);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <nav className='navbar-vertical'>
      <ul className='navbar-vertical__list navbar-vertical__list--profile'>
        <li className='navbar-vertical__list-item'>
          <NavLink
            to={`/me/settings`}
            className='paragraph navbar-vertical__link'
            activeClassName='navbar-vertical__link--active'
          >
            <svg className='button__icon '>
              <use xlinkHref={`${sprite}#icon-cog`}></use>
            </svg>
            {isSmallerWindow && 'Settings'}
          </NavLink>
        </li>
        <li className='navbar-vertical__list-item'>
          <NavLink
            to={`/me/orders`}
            className='paragraph navbar-vertical__link'
            activeClassName='navbar-vertical__link--active'
          >
            <svg className='button__icon '>
              <use xlinkHref={`${sprite}#icon-dropbox`}></use>
            </svg>
            {isSmallerWindow && 'My Orders'}
          </NavLink>
        </li>
        <li className='navbar-vertical__list-item'>
          <NavLink
            to={`/me/address`}
            className='paragraph navbar-vertical__link'
            activeClassName='navbar-vertical__link--active'
          >
            <svg className='button__icon '>
              <use xlinkHref={`${sprite}#icon-location2`}></use>
            </svg>
            {isSmallerWindow && 'My Address'}
          </NavLink>
        </li>
        {isBiggerWindow && (
          <li className='navbar-vertical__list-item'>
            <NavLink
              to='/'
              className='paragraph navbar-vertical__link'
              onClick={logout}
            >
              <svg className='button__icon'>
                <use xlinkHref={`${sprite}#icon-exit`}></use>
              </svg>
              <p className='paragraph'>Log out</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavbarVertical;
