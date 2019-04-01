import Tekstomrade from 'nav-frontend-tekstomrade';
import React, { FunctionComponent } from 'react';
import './footer.css';
import { _FOOTER_TEXT } from './strings';

const Footer: FunctionComponent = () => {
  return (
    <footer className="footer">
      <Tekstomrade>
        {_FOOTER_TEXT}
      </Tekstomrade>
    </footer>
  );
};

export default Footer;
