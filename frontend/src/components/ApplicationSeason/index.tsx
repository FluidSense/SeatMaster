import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { fetchApplicationSeasonData } from './actions';
import ApplicationSeasonComponent from './component';
import { IApplicationSeason } from './reducer';

interface IStateProps {
  applicationSeason: IApplicationSeason;
}

interface IDispatchProps {
  fetchSeason: () => ThunkAction<Promise<void>, {}, {}, AnyAction>;
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _ApplicationSeasonContainer extends React.Component<Props, {}> {
  public componentDidMount = () => {
    const { fetchSeason } = this.props;
    fetchSeason();
  }

  public render = () => {
    const { applicationSeason } = this.props;
    return (
      <ApplicationSeasonComponent
        applicationSeason={applicationSeason}
      />
    );
  }
}

const mapStateToProps = (state: IStateProps) => ({
  applicationSeason: state.applicationSeason,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchSeason: () => dispatch(fetchApplicationSeasonData()),
});

const ApplicationSeasonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ApplicationSeasonContainer);

export default ApplicationSeasonContainer;
