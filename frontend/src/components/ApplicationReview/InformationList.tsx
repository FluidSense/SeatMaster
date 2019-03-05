import React from 'react';
import { IRoomInfoObject, IUserInfoObject } from './ApplicationOverview';
import InfoPanel from './InfoPanel';

interface IProps {
  information: validProps;
}

type validProps = IRoomInfoObject | IUserInfoObject;

const InformationList: React.FunctionComponent<IProps> = (props) => {
  const { information } = props;
  const list = Object.entries(information).map(array => (
    <InfoPanel key={array[0]} title={array[0]} text={array[1]} />));
  return (
    <>
      {list}
    </>
  );
};

export default InformationList;
