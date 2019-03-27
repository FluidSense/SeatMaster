import KnappBase from 'nav-frontend-knapper';
import PanelBase, { Panel } from 'nav-frontend-paneler';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { IApplication } from '../Application';
import { ISeat } from '../ViewRooms';

interface IProps {
  seat: ISeat;
  applications?: IApplication[];
}

interface IState {
  selectedApp?: IApplication;
}

class SeatPlacer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedApp: undefined,
    };
  }
  public render() {
    const { seat, applications } = this.props;
    const { selectedApp } = this.state;

    if (seat.user) {
      return (
        <Panel border={true} style={{ display:'flex', width:'35%' }}>
          <PanelBase border={true}>{seat.id}</PanelBase>
          <PanelBase border={true}>{seat.user.username}</PanelBase>
          <KnappBase type="fare" >X</KnappBase>
        </Panel>
      );
    }
    if (!applications) return null;
    const userOptions = this.applicationsToOption(applications);
    return (
      <Panel border={true} style={{ display:'flex', width:'35%' }}>
        <PanelBase border={true}>{seat.id}</PanelBase>
        <Select label="" onChangeCapture={this.selectApp}>
          <option value="">Select user</option>
          {userOptions}
        </Select>
        <KnappBase type="hoved" disabled={selectedApp ? false : true}>
          Assign Seat
        </KnappBase>
      </Panel>
    );
  }

  private applicationsToOption = (apps: IApplication[]) => apps.map((app, index) => {
    return <option key={index} value={app.id}>{app.user.username}</option>;
  })

  private selectApp = (e: React.FormEvent) => {
    const field = e.target as HTMLFormElement;
    const applicationId = parseInt(field.value, 10);
    const applications = this.props.applications ? this.props.applications : [];
    const application = applications.find(app => app.id === applicationId);
    this.setState({ selectedApp: application });
  }

}

export default SeatPlacer;
