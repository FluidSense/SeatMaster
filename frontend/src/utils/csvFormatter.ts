import { IUser } from '../API/interfaces';
import { IRoom, ISeat } from '../components/ViewRooms';

export const headers = [
  { label: 'Full Name', key: 'fullname' },
  { label: 'NTNU Username', key: 'username' },
  { label: 'Email', key: 'email' },
];

interface ISeatWithUser extends ISeat {
  user?: IUser;
}

export interface IRoomWithUsers extends IRoom {
  seats: {
    count: number,
    seats: ISeatWithUser[],
  };
}

const formatCsv = (data: IRoomWithUsers) => {
  const filteredSeats = data.seats.seats.filter((seat: ISeatWithUser) => seat.user !== undefined);
  const users = filteredSeats.map((seat: ISeatWithUser) => {
    const { user } = seat;
    if (!user) return {};
    return ({ fullname: user.fullname, username: user.username, email: user.email });
  });
  return users;
};

export default formatCsv;
