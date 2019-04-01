import { AnyAction } from 'redux';
import { TOGGLE_SIDE_BAR } from './constants';

export interface ISideBarState {
  open: boolean;
}
export const initialState = {
  open: false,
};

export const sideBarReducer = (
  state: ISideBarState = initialState,
  action: AnyAction,
): ISideBarState => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        open: !state.open,
      };
    default: return { ...state };
  }
};
