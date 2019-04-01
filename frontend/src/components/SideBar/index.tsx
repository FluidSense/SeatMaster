import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStore } from '../../store';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import { toggleSideBar as toggle } from './action';
import Presentational from './Presentational';
import { ISideBarState } from './reducer';

interface IStateProps {
  userInformation: IRegisteredUserState;
  sideBar: ISideBarState;
}

interface IDispatchProps {
  toggleSideBar: () => void;
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props> {
  public render() {
    const { userInformation, sideBar, toggleSideBar } = this.props;
    const props = { userInformation, sideBar, toggleSideBar };
    return (
      <Presentational
        {...props}
      />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  sideBar: state.sideBar,
  userInformation: state.userInformation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleSideBar: () => dispatch(toggle()),
});

const SideBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default SideBar;
