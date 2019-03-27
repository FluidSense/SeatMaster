import moment from 'moment';
import { reducers } from '../../store';

test('reducers', () => {
  let state;
  const voidFunc = () => 'null';
  state = reducers(
    {
      adminRoom: {}, applicationSeason: {
        currentSeason: {
          applicationPeriodEnd: moment('2019-03-13T10:28:33.505Z'),
          applicationPeriodStart: moment('2019-03-13T10:28:33.505Z'),
          end: moment('2019-03-13T10:28:33.505Z'),
          start: moment('2019-03-13T10:28:33.505Z'),
        },
      }, applications: {
        applications: [],
        registeredApplication: { status: 'NOT_FOUND' },
      }, assignSeat: {
        seat: undefined,
      }, oidc: {
        isLoadingUser: false,
        user: {
          access_token: 'dd7e8489-9545-4857-b76d-092027b2570b',
          expired: false,
          expires_at: 1611224912,
          expires_in: 100000,
          id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImIwMGE1MDYxY' +
            'zMxMTQxMjA5Y2RmMjlkYWM3NjYwMTkxMWI2N2M4YWQifQ.eyJpc3MiOiJodHRwczpcL1w' +
            'vYXV0aC5kYXRhcG9ydGVuLm5vIiwiYXVkIjoiNzdlZTMzY2QtY2M3Zi00YjdhLWJjZTktMjQ' +
            'xYzk2NDU4ZjE0Iiwic3ViIjoiOWYwYmE4OWQtZDkxZi00Y2FkLWE3MmYtOGNjNDc3ZTBjNmMzI' +
            'iwiaWF0IjoxNTUyNDcyOTEyLCJleHAiOjE1NTI0NzY1MTIsImF1dGhfdGltZSI6MTU1MjQ3MjkxM' +
            'n0.Ro_wwmkOvQY1T2XhiEwN88-rYtneVdkLzCWRn-lRhcL1jwR6TT6_W9Kr0fKLP06P2XIPiQ5wHkvD0Y' +
            'VzNS7uidq7I7RTSnnoZctMzV71mePQHVArkvhypZDt7MkOAYgyDj4XD-PJA7VoYTjJ-y54IFeM6SMmn-S' +
            'RKpTCUCxhz4bu_3zhu-DhljUHTsz1nCiUki2XssRX4DH7-KKO58kDikvHQ0hypB_CdWZ5Ge2gQEvHn2Yx5RUI'
            +
            'Cpbc5CGObGA0BpYd9-eEECgs0zAxZ72Y6-F7bddv1fmkkRHdxCP4E1WWNHF-blQbpnGodHuBF6XJE8ADzDZQl'
            +
            'ye_nz0tux2BWw',
          profile: {
            auth_time: 1552416614,
            'connect-userid_sec': 'feide:paaledwl@ntnu.no',
            'dataporten-userid_sec': 'feide:paaledwl@ntnu.no',
            email: 'paaledwl@stud.ntnu.no',
            email_verified: true,
            name: 'Pål-Edward Larsen',
            picture: 'https://api.dataporten.no/userinfo/v1/user/media/p:ff7967e4-e155-498' +
              'a-8ccf-241e1bf506cd',
            sub: '9f0ba89d-d91f-4cad-a72f-8cc477e0c6c3',
          },
          scope: 'email groups longterm openid profile userid userid-feide',
          scopes: ['no scope'],
          session_state: 'any',
          state: 'state',
          toStorageString: voidFunc,
          token_type: 'Bearer',
        },
      }, rooms: {
        rooms: [],
      }, router: {
        action: 'POP',
        location: {
          hash: '',
          key: 'lz3dt5',
          pathname: '/',
          search: '',
          state: 'any',
        },
      }, userInformation: {
        email: 'paaledwl@stud.ntnu.no',
        id: 1,
        loading: false,
        registered: true,
        username: 'paaledwl',
      },
    },
    {
      payload: {
        comments: 'schmalla',
        id: 1,
        needs: 'halladsadsas',
        partnerApplication: {},
        preferredRoom: 'space_commander',
        seatRollover: true,
        status: 'SUBMITTED',
        user: {
          email: 'paaledwl@stud.ntnu.no',
          id: 1,
          username: 'paaledwl',
        },
      },
      type: 'SET_APPLICATION_DATA',
    });
  expect(state).toEqual({
    adminReviewApplication: {
      api: {
        status: 0,
      },
      application: {
        status: 'NOT_FOUND',
      },
    },
    adminRoom: {},
    applicationSeason: {
      currentSeason: {
        applicationPeriodEnd: moment('2019-03-13T10:28:33.505Z'),
        applicationPeriodStart: moment('2019-03-13T10:28:33.505Z'),
        end: moment('2019-03-13T10:28:33.505Z'),
        start: moment('2019-03-13T10:28:33.505Z'),
      },
    },
    applications: {
      applications: [],
      registeredApplication: {
        comments: 'schmalla',
        id: 1,
        needs: 'halladsadsas',
        partnerApplication: {},
        preferredRoom: 'space_commander',
        seatRollover: true,
        status: 'SUBMITTED',
        user: { email: 'paaledwl@stud.ntnu.no', id: 1, username: 'paaledwl' },
      },
    }, assignSeat: {
      seat: undefined,
    }, oidc: {
      isLoadingUser: false,

      user: {
        access_token: 'dd7e8489-9545-4857-b76d-092027b2570b',
        expired: false,
        expires_at: 1611224912,
        expires_in: 100000,
        id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImIwMGE1MDYxY' +
          'zMxMTQxMjA5Y2RmMjlkYWM3NjYwMTkxMWI2N2M4YWQifQ.eyJpc3MiOiJodHRwczpcL1w' +
          'vYXV0aC5kYXRhcG9ydGVuLm5vIiwiYXVkIjoiNzdlZTMzY2QtY2M3Zi00YjdhLWJjZTktMjQ' +
          'xYzk2NDU4ZjE0Iiwic3ViIjoiOWYwYmE4OWQtZDkxZi00Y2FkLWE3MmYtOGNjNDc3ZTBjNmMzI' +
          'iwiaWF0IjoxNTUyNDcyOTEyLCJleHAiOjE1NTI0NzY1MTIsImF1dGhfdGltZSI6MTU1MjQ3MjkxM' +
          'n0.Ro_wwmkOvQY1T2XhiEwN88-rYtneVdkLzCWRn-lRhcL1jwR6TT6_W9Kr0fKLP06P2XIPiQ5wHkvD0Y' +
          'VzNS7uidq7I7RTSnnoZctMzV71mePQHVArkvhypZDt7MkOAYgyDj4XD-PJA7VoYTjJ-y54IFeM6SMmn-S' +
          'RKpTCUCxhz4bu_3zhu-DhljUHTsz1nCiUki2XssRX4DH7-KKO58kDikvHQ0hypB_CdWZ5Ge2gQEvHn2Yx5RUI' +
          'Cpbc5CGObGA0BpYd9-eEECgs0zAxZ72Y6-F7bddv1fmkkRHdxCP4E1WWNHF-blQbpnGodHuBF6XJE8ADzDZQl' +
          'ye_nz0tux2BWw',
        profile: {
          auth_time: 1552416614,
          'connect-userid_sec': 'feide:paaledwl@ntnu.no',
          'dataporten-userid_sec': 'feide:paaledwl@ntnu.no',
          email: 'paaledwl@stud.ntnu.no',
          email_verified: true,
          name: 'Pål-Edward Larsen',
          picture: 'https://api.dataporten.no/userinfo/v1/user/media/p:ff7967e4-e' +
            '155-498a-8ccf-241e1bf506cd',
          sub: '9f0ba89d-d91f-4cad-a72f-8cc477e0c6c3',
        },
        scope: 'email groups longterm openid profile userid userid-feide',
        scopes: ['no scope'],
        session_state: 'any',
        state: 'state',
        toStorageString: voidFunc,
        token_type: 'Bearer',
      },
    }, rooms: { rooms: [] },
    router: {
      action: 'POP',
      location: {
        hash: '',
        key: 'lz3dt5',
        pathname: '/',
        search: '',
        state: 'any',
      },
    },
    seats: { success: undefined },
    students: {
      users: [],
    },
    userInformation: {
      email: 'paaledwl@stud.ntnu.no',
      id: 1,
      loading: false,
      registered: true,
      username: 'paaledwl',
    },
  });
});
