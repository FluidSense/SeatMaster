import * as React from 'react';
import { Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';

interface ILoginProps {
  fetchUserData: (userId: number) => any;
}

export const Presentational: React.FunctionComponent<ILoginProps> = (props) => {
  const { fetchUserData } = props;
  const onClickAction = () => fetchUserData(1);
  return (
    <Link to="/">
      <KnappBase
        type="hoved"
        htmlType="button"
        onClick={onClickAction}
      >
        Log in
      </KnappBase>
    </Link>
  );
};
