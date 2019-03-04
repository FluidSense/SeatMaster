import moment from 'moment';
import { reducers } from '../../store';

test('reducers', () => {
  let state;
  state = reducers(
    {
      adminRoom: {
        error: undefined,
        submitted: undefined,
      },
      applicationSeason: {
        currentSeason: {
          applicationPeriodEnd: moment('1970-01-01T00:00:01.970Z'),
          applicationPeriodStart: moment('1970-01-01T00:00:01.970Z'),
          end: moment('1970-01-01T00:00:01.970Z'),
          start: moment('1970-01-01T00:00:01.970Z'),
        },
      },
      rooms: {
        rooms: [],
      },
      userInformation: {
        applicationStatus: 'NOT_FOUND',
        email: 'test@test.com',
        fullname: 'Test Testesen',
        phone: '11223344',
        status: 'Master student',
        user: {
          id: 1,
          username: 'usrnam',
        },
      },
    },
    {
      payload: {
        applicationPeriodEnd: '2019-03-03 11:41:04.793276',
        applicationPeriodStart: '2019-02-24 11:41:04.793276',
        end: '2019-07-24 11:41:04.793276',
        start: '2019-02-24 11:41:04.793276',
      },
      type: 'SET_APPLICATION_SEASON',
    });
  expect(state).toEqual({
    adminRoom: {
      error: undefined,
      submitted: undefined,
    },
    applicationSeason: {
      currentSeason: {
        applicationPeriodEnd: moment('2019-03-03 11:41:04.793276'),
        applicationPeriodStart: moment('2019-02-24 11:41:04.793276'),
        end: moment('2019-07-24 11:41:04.793276'),
        start: moment('2019-02-24 11:41:04.793276'),
      },
    },
    rooms: {
      rooms: [],
    },
    userInformation: {
      applicationStatus: 'NOT_FOUND',
      email: 'test@test.com',
      fullname: 'Test Testesen',
      phone: '11223344',
      status: 'Master student',
      user: {
        id: 1,
        username: 'usrnam',
      },
    },
  });
});
