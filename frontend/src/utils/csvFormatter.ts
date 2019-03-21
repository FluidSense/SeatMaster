import { IRoom, ISeat } from '../components/ViewRooms';

export const headers = [
  { label: 'Full Name', key: 'fullname' },
  { label: 'NTNU Username', key: 'username' },
];

interface ISeatWithUser extends ISeat {
  user?: {
    id: number;
    username: string;
    name: string;
  };
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
    return ({ fullname: user.name, username: user.username });
  });
  return users;
};

export default formatCsv;
