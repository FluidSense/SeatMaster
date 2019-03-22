import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import * as React from 'react';
import { Link } from 'react-router-dom';
import veileder from './../RegisterUser/veileder';
import { _VEILEDER_TEXT } from './constants';
import './page404.css';

const Page404: React.FunctionComponent = () => {

  return (
    <div className="main-content veileder-wrapper">
      <Veilederpanel type={'plakat'} kompakt={true} svg={veileder}>
        <div className="contents">
          <Sidetittel tag="h1">404</Sidetittel>
          {_VEILEDER_TEXT}
          <br />
          <Link to="/" >
            <KnappBase
              type="hoved"
              htmlType="button"
              id="backButton"
            >
              Go to home
            </KnappBase>
          </Link>
        </div>
      </Veilederpanel>
    </div>
  );
};

export default Page404;
