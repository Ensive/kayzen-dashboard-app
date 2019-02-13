import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <small>All rights reserved &copy; {new Date().getFullYear()}</small>
    </footer>
  );
}

export default Footer;
