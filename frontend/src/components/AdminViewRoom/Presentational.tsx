import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Redirect } from 'react-router';
import { IUser } from '../../API/interfaces';
import { IApplication } from '../Application';
import { IRoom, ISeat } from '../ViewRooms';
import SeatPlacer from './SeatPlacer';
import { _EDIT_ROOM_BUTTON } from './strings';

interface IProps {
  location: {
    room?: IRoom;
  };
  match: {
    id: number,
  };
  applications?: IApplication[];
}

interface IState {
  redirect: boolean;
}

class Presentational extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  public render() {
    const { applications } = this.props;
    const { room } = this.props.location;
    const { redirect } = this.state;
    if (!room) return <Redirect to="/admin/rooms" />;
    const seats = this.seatsPlacers(room.seats.seats, applications);
    if (redirect) {
      return (
      <Redirect
        to={{ room, pathname: `/admin/rooms/${room.id}/update-room` }}
      />);
    }

    return (
      <div className="main-content">
        <div className="title-and-button">
          <Sidetittel>{room.name}</Sidetittel>
          <KnappBase type="hoved" onClick={this.setRedirect}>
              {_EDIT_ROOM_BUTTON}
          </KnappBase>
        </div>
        <h2>Info</h2>
        <p>{room.info}</p>
        <div>
        {seats}
        </div>
      </div>
    );
  }

  private setRedirect = () => {
    this.setState({ redirect: true });
  }
  private seatsPlacers = (seats: ISeat[], applications?: IApplication[]) => {
    return seats.map((seat, index) => {
      return <SeatPlacer key={index} seat={seat} applications={applications}/>;
    });
  }
}

export default Presentational;
