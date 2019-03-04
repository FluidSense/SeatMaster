import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Presentational from './Presentational';

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
