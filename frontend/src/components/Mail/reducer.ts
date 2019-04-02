import { AnyAction } from 'redux';

export interface IMailState {
  status: number;
}

const initialState: IMailState = {
  status: 0,
};

const mailReducer = (
  state: IMailState = initialState,
  action: AnyAction,
): IMailState => {
  const { type, payload } = action;
  switch (type) {
    case 'MAIL_SUCCESS': {
      return { ...state, status: payload };
    }
    case 'MAIL_ERRORED': {
      return { ...state, status: payload };
    }
    case 'MAIL_RESET': {
      return { ...state, status: payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default mailReducer;
