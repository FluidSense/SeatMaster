import KnappBase from 'nav-frontend-knapper';
import { User } from 'oidc-client';
import * as React from 'react';

interface IDispatchProps {
  deleteAndRemoveUser: () => void;
}

interface IStateProps {
  isLoadingUser: boolean;
  user?: User;
}

type Props = IDispatchProps & IStateProps;

export const Presentational: React.FunctionComponent<Props> = (props) => {
  const { deleteAndRemoveUser, isLoadingUser, user } = props;

  const deleteUser = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (user && !user.expired) {
      await deleteAndRemoveUser();
    }
  };

  return (
    <div style={{ padding: '2rem 2.5rem' }}>
      <KnappBase
        type="fare"
        htmlType="submit"
        autoDisableVedSpinner={isLoadingUser}
        onClick={deleteUser}
      >
        Delete
      </KnappBase>
    </div>
  );
};

export default Presentational;
