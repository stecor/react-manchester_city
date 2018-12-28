import React from 'react';
import Header from '../components/Header_footer/Header';

const Layout = (props) => (
  <div>
    <Header />
    {props.children}

  </div>
);

export default Layout;
