import KnappBase from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import { FETCHING_APPLICATION_SEASONS } from './constants';
import SeasonLink from './SeasonLink';
import { _SEASON_TITLE } from './strings';

interface IProps {
  onClick: any;
  fetching: string;
  seasons: IApplicationSeason[];
}

const Presentational: FunctionComponent<IProps> = (props) => {
  const { onClick, fetching, seasons } = props;
  if (fetching === FETCHING_APPLICATION_SEASONS) {
    return (<TitleAndSpinner title={_SEASON_TITLE} />);
  }
  const seasonList = seasons.map(season => (
    <SeasonLink key={season.id} season={season} />
  ));
  return (
    <div className="main-content">
      <div className="title-and-button">
        <Sidetittel>{_SEASON_TITLE}</Sidetittel>
        <KnappBase id="redirect-new-room" type="hoved" onClick={onClick}>
          {'Create new application season'}
        </KnappBase>
      </div>
      {seasonList}
    </div>
  );
};

export default Presentational;
