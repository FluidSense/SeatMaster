import Person from '-!svg-react-loader!./../../assets/veileder.svg';
import KnappBase from 'nav-frontend-knapper';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { Link } from 'react-router-dom';

const Page404: React.FunctionComponent = () => {

  const _VELEDER_TEXT = 'There does not seem to be a page here. Click the button below to go back.';

  return (
    <div>
      <Veileder storrelse="XL" tekst={_VELEDER_TEXT}>
        <Person />
      </Veileder>

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
  );
};

export default Page404;
