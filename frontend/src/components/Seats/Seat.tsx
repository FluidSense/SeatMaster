import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import { Panel } from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';
import React, { Component } from 'react';
import { _CHANGE_ID } from './strings';

interface IProps {
  id: number;
  name: string;
  deleteSelf: (id: number) => void;
  updateSelf: (id: number, newName: string) => void;
}

interface IState {
  inputContent: string;
}

class Seat extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputContent: '',
    };
  }

  public render() {
    const { name } = this.props;

    return (
      <>
        <Panel border={true}>
          <Input
            label={'Seat ID'}
            bredde="S"
            placeholder={name}
            onChange={this.handleInputChange}
          />
          <Knapp onClick={this.changeId}>{_CHANGE_ID}</Knapp>
          <Lukknapp bla={true} onClick={this.deleteSeat} />
        </Panel>
      </>
    );
  }

  private deleteSeat = () => {
    const { id, deleteSelf } = this.props;
    deleteSelf(id);
  }

  private changeId = () => {
    const { id, updateSelf } = this.props;
    const { inputContent } = this.state;
    updateSelf(id, inputContent);
  }

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputContent: e.target.value });
  }
}

export default Seat;
