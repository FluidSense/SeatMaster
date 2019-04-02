import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { mailList, mailStudent } from './../../API/calls';
import { IMail } from './index';

export const mailSuccess = () => ({
  payload: 200,
  type: 'MAIL_SUCCESS',
});

export const mailErrored = () => ({
  payload: 400,
  type: 'MAIL_ERRORED',
});

export const mailReset = () => ({
  payload: 0,
  type: 'MAIL_RESET',
});

export const sendEmail = (mail: IMail):
  ThunkAction<void, {}, {}, any> => async (dispatch: Dispatch) => {
    let result;
    dispatch(mailReset());
    switch (mail.type) {
      case 'ROOM': {
        result = await mailList(mail);
        break;
      }
      case 'DIRECT': {
        result = await mailStudent(mail);
        break;
      }
      case 'ALL': {
        result = await mailList(mail);
        break;
      }
    }
    if (result) dispatch(mailSuccess());
    else dispatch(mailErrored());
  };
