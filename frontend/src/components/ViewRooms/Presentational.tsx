import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import SearchBar, { searchBarEvent } from '../SearchBar';
import { FETCHING_ROOMS } from './constants';
import { IStateProps } from './index';
import RoomLink from './RoomLink';
import { _CREATE_ROOM_BUTTON, _VIEW_ROOM_TITLE } from './strings';

interface IProps extends IStateProps {
  onClick: () => void;
  filterRooms: (event: searchBarEvent) => void;
}

const createRoom = (onClick: () => void, filterRooms: (event: searchBarEvent) => void) => (
  <div>
    <div className="title-and-button">
      <Sidetittel>{_VIEW_ROOM_TITLE}</Sidetittel>
    </div>
      <SearchBar filterFunction={filterRooms}/>
      <div className="single-button">
        <KnappBase id="redirect-new-room" type="hoved" onClick={onClick}>
          {_CREATE_ROOM_BUTTON}
        </KnappBase>
      </div>
  </div>
);

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { rooms, onClick, fetching, filterRooms } = props;
  if (fetching === FETCHING_ROOMS) return <TitleAndSpinner title={_VIEW_ROOM_TITLE}/>;
  if (!rooms || !rooms.length) {
    return (
      <div className="main-content">
        {createRoom(onClick, filterRooms)}
      </div>);
  }
  const roomList = rooms.map(room => (
    <RoomLink key={room.id} room={room} />
  ));
  return (
    <div className="main-content">
      {createRoom(onClick, filterRooms)}
      {roomList}
    </div>
  );
};

export default Presentational;
