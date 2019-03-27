import KnappBase from 'nav-frontend-knapper';
import PanelBase, { Panel } from 'nav-frontend-paneler';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { IUser } from '../../API/interfaces';
import { IApplication } from '../Application';
import { ISeat } from '../ViewRooms';

interface IProps {
  seat: ISeat;
  applications?: IApplication[];
}

interface IState {
  selectedUser?: IUser;
}

class SeatPlacer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedUser: undefined,
    };
  }
  public render() {
    const { seat, applications } = this.props;
    const { selectedUser } = this.state;
    if (!applications) return null;
    const appsWithUsers = applications.filter(application => application.user ? true : false);
    const usersWithUndefined = appsWithUsers.map(application => application.user);
    const users = usersWithUndefined.filter(user => user !== undefined);
    console.log('users:', users);

    if (seat.user) {
      return (
        <Panel border={true} style={{ display:'flex', width:'35%' }}>
          <PanelBase border={true}>{seat.id}</PanelBase>
          <PanelBase border={true}>{seat.user.username}</PanelBase>
          <KnappBase type="fare" >X</KnappBase>
        </Panel>
      );
    }
    return (
      <Panel border={true} style={{ display:'flex', width:'35%' }}>
        <PanelBase border={true}>{seat.id}</PanelBase>
        <Select label="">
          <option value="">Select user</option>
        </Select>
        <KnappBase type="hoved" disabled={selectedUser ? false : true}>
          Assign Seat
        </KnappBase>
      </Panel>
    );
  }

  private usersToOption = (users: IUser[]) => users.map((user, index) => {
    return <option key={index} value={user.id}>{user.username}</option>;
  })
}

export default SeatPlacer;
