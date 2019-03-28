import {
  CREATE_ROOM,
  DELETE_ROOM,
  RESET_PAGE,
  UPDATE_ROOM,
} from '../../components/AdminRoom/constants';
import reducer from '../../components/AdminRoom/reducer';
import {
  _ALERT_CREATED_MESSAGE,
  _ALERT_DELETED_MESSAGE,
  _ALERT_UPDATED_MESSAGE,
} from '../../components/AdminRoom/strings';

describe('Admin room reducer', () => {
  it('should return default state', () => {
    const badAction = { type: 'lol', success: null };
    expect(reducer(undefined, (badAction))).toEqual(
      { error: undefined, success: undefined },
    );
  });

  it('should return create room success state', () => {
    const createAction = { type: CREATE_ROOM, success: true };
    expect(reducer(undefined, createAction)).toEqual(
      { error: undefined, success: true },
    );
  });

  it('should return create room failure state', () => {
    const createActionFail = { type: CREATE_ROOM, success: false };
    expect(reducer(undefined, createActionFail)).toEqual(
      { error: _ALERT_CREATED_MESSAGE, success: false },
    );
  });

  it('should return update room success state', () => {
    const updateAction = { type: UPDATE_ROOM, success: true };
    expect(reducer(undefined, updateAction)).toEqual(
      { error: undefined, success: true },
    );
  });

  it('should return update room failure state', () => {
    const updateActionFail = { type: UPDATE_ROOM, success: false };
    expect(reducer(undefined, updateActionFail)).toEqual(
      { error: _ALERT_UPDATED_MESSAGE, success: false },
    );
  });

  it('should return delete room success state', () => {
    const deleteAction = { type: DELETE_ROOM, success: true };
    expect(reducer(undefined, deleteAction)).toEqual(
      { error: undefined, success: true },
    );
  });

  it('should return room delete failure state', () => {
    const deleteActionFail = { type: DELETE_ROOM, success: false };
    expect(reducer(undefined, deleteActionFail)).toEqual(
      { error: _ALERT_DELETED_MESSAGE, success: false },
    );
  });

  it('should return SOMETHING state', () => {
    const resetPageAction = { type: RESET_PAGE, success: undefined };
    expect(reducer(undefined, resetPageAction)).toEqual(
      { error: undefined, success: undefined },
    );
  });
});
