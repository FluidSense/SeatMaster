import { IRoom, ISeat } from '../components/ViewRooms';

export const columns = [{
  displayName: 'Full name',
  id: 'name',
}, {
  displayName: 'NTNU Username',
  id: 'username',
}];

interface ISeatWithUser extends ISeat {
  user: {
    id: number;
    username: string;
    name: string;
  };
}

interface IRoomWithUsers extends IRoom {
  seats: {
    count: number,
    seats: ISeatWithUser[],
  };
}

export const formatCsv = (data: IRoomWithUsers) => {
  const users = data.seats.seats.map((seat: ISeatWithUser) => {
    const { user } = seat;
    return ({ name: user.name, username: user.username });
  });
  return users;
};
