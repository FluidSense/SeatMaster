import React from 'react';
import { IInformationObject, IRoomInfoObject, IUserInfoObject } from './ApplicationOverview';
import InfoPanel from './InfoPanel';
interface IProps {
  information: validProps;
}

type validProps = IInformationObject | IRoomInfoObject | IUserInfoObject;

const InformationList: React.FunctionComponent<IProps> = (props) => {
  const { information } = props;
  const list = Object.entries(information).map((array) => {
    const boolValue = typeof array[1] === 'boolean' && array[1] ? 'Yes' : 'No';

    if (array[1] !== undefined) {
      return (
        <InfoPanel
          key={array[0]}
          title={array[0]}
          text={typeof array[1] === 'boolean' ? boolValue : array[1]}
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
