import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { sendEmail } from './actions';
import Presentational from './Presentational';

export type MailTypes = 'ROOM' | 'DIRECT' | 'ALL';

export interface IMail {
  type: MailTypes;
  ids: number[];
  subject: string;
  content: string;
}

const mapStateToProps = (state: IStore) => ({
  status: state.mail.status,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  sendMail: (mail: IMail) => dispatch(sendEmail(mail)),
});

const Mail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Mail;
