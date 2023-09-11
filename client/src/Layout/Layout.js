import React from 'react';
import Header from '../Components/Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
