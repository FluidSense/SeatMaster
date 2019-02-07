import { ACTION_LIST } from './Strings';

export interface IFormState {
  room: string;
  partner: boolean;
  partner_name: string;
  needs: boolean;
  needs_text: string;
  comments: string;
  keep_seat: boolean;
}

const initialState = {
  comments: '',
  keep_seat: false,
  needs: false,
  needs_text: '',
  partner: false,
  partner_name: '',
  room: '',
};

export const applicationFormReducer = (
  state: IFormState = initialState,
  action: any,
): IFormState => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_LIST.comments: {
      return {
        ...state,
        comments: payload,
      };
    }
    case ACTION_LIST.keep_seat: {
      return {
        ...state,
        keep_seat: payload,
      };
    }
    case ACTION_LIST.needs: {
      return {
        ...state,
        needs: payload,
      };
    }
    case ACTION_LIST.needs_text: {
      return {
        ...state,
        needs_text: payload,
      };
    }
    case ACTION_LIST.partner: {
      return {
        ...state,
        partner: payload,
      };
    }
    case ACTION_LIST: {
      return {
        ...state,
        partner_name: payload,
      };
    }
    case ACTION_LIST.room: {
      return {
        ...state,
        room: payload,
      };
    }
    default:
      return state;
  }
};
