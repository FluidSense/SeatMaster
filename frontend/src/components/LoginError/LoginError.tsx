import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const LoginError: React.FunctionComponent = (props) => {

  return (
    <div>
      Something went wrong during login. Please try again.
      <Link to="/" >
        <KnappBase
          type="hoved"
          htmlType="button"
          id="backButton"
        >
        Go back
        </KnappBase>
      </Link>
    </div>
  );
};
