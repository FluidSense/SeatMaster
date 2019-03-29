import KnappBase from 'nav-frontend-knapper';
import PanelBase, { Panel } from 'nav-frontend-paneler';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { IUser } from '../../API/interfaces';
import { ISeat } from '../ViewRooms';
import { _ASSIGN_SEAT } from './strings';

interface IProps {
  seat: ISeat;
  users?: IUser[];
  assign: (user: IUser, seat: ISeat) => void;
  delete: (seat: ISeat) => void;
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

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.seat.user && !this.props.seat.user) {
      this.setState({ selectedUser: undefined });
    }
  }
  public render() {
    const { seat, users } = this.props;
    const { selectedUser } = this.state;

    if (seat.user) {
      return (
        <Panel border={true} style={{ display:'flex', width:'35%' }}>
          <PanelBase border={true}>{seat.id}</PanelBase>
          <PanelBase border={true}>{seat.user.username}</PanelBase>
          <KnappBase type="fare" onClick={this.delete}>X</KnappBase>
        </Panel>
      );
    }
    if (!users) return null;
    const userOptions = this.usersToOption(users);
    return (
      <Panel border={true} style={{ display:'flex', width:'35%' }}>
        <PanelBase border={true}>{seat.id}</PanelBase>
        <Select label="" onChangeCapture={this.selectUser}>
          <option value="">Select user</option>
          {userOptions}
        </Select>
        <KnappBase type="hoved" disabled={selectedUser ? false : true} onClick={this.assign}>
          {_ASSIGN_SEAT}
        </KnappBase>
      </Panel>
    );
  }

  private usersToOption = (users: IUser[]) => users.map((user, index) => {
    return <option key={index} value={user.id}>{user.username}</option>;
  })

  private selectUser = (e: React.FormEvent) => {
    const field = e.target as HTMLFormElement;
    const userId = parseInt(field.value, 10);
    const users = this.props.users ? this.props.users : [];
    const user = users.find(usr => usr.id === userId);
    this.setState({ selectedUser: user });
  }

  private assign = (e: React.FormEvent) => {
    e.preventDefault();
    const user = this.state.selectedUser;
    const seat = this.props.seat;
    if (user && seat) this.props.assign(user, seat);
  }

  private delete = (e: React.FormEvent) => {
    e.preventDefault();
    const seat = this.props.seat;
    if (seat && seat.user) this.props.delete(seat);
  }
}

export default SeatPlacer;
