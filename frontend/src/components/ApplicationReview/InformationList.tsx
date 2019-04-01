import React from 'react';
import { IInformationObject, IRoomInfoObject, IUserInfoObject } from './ApplicationOverview';
import InfoPanel from './InfoPanel';
import PartnerPanel from './PartnerPanel';
interface IProps {
  information: validProps;
}

type validProps = IInformationObject | IRoomInfoObject | IUserInfoObject;

const InformationList: React.FunctionComponent<IProps> = (props) => {
  const { information } = props;
  const list = Object.entries(information).map((entry) => {
    if (entry[1] instanceof Object) {
      return entry[1];
    }
    if (entry[1] !== undefined) {
      return (
        <InfoPanel
          key={entry[0]}
          title={entry[0]}
          text={entry[1]}
        />);
    }

  });
  return (
    <>
      {list}
    </>
  );
};

export default InformationList;
