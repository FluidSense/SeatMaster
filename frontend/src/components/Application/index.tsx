import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IUser } from '../../API/interfaces';
import { ISeat } from '../ViewRooms';
import Presentational from './Presentational';

export interface IPartnerApplication {
  comments?: string;
  id: number;
  needs?: string;
  preferredRoom?: string;
  seatRollover?: boolean;
  status: string;
  rank: string;
  user: IUser;
}

export interface IApplication extends IPartnerApplication {
  partnerApplication?: IPartnerApplication;
  seat?: ISeat;
}

interface IState {
  modalIsOpen: boolean;
}

const _TITLE = 'My application';

export class Application extends React.Component<{}, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  public render() {
    return (
      <div className="main-content">
        <Sidetittel className="page-title">{_TITLE}</Sidetittel>
        <Presentational modalIsOpen={this.state.modalIsOpen} changeModal={this.changeModal} />
      </div >
    );
  }

  private changeModal = (modalOpen: boolean) => { this.setState({ modalIsOpen: modalOpen }); };
}

export default Application;
