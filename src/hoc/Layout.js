import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Footer from '../components/Footer';
import CartPanel from '../components/CartPanel';
import BackToTopButton from '../components/BackToTopButton';
import MenuPanel from '../components/MenuPanel';

const Layout = props => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1140);

  const handleResize = () => setIsDesktop(window.innerWidth > 1140);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='container__parent'>
      {isDesktop ? <Header /> : <HeaderMobile />}

      <CartPanel />

      {/* access to store */}
      <MenuPanel />

      {/* back to top button */}
      {isDesktop && <BackToTopButton />}

      <div className='container__background'>
        <main className='container'>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
