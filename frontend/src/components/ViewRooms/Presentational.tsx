import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import React from 'react';

interface IProps {
  room: {
    id: number,
    name: string,
    info: string,
  };
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { name, info } = props.room;
  return(
    <LenkepanelBase href="/admin/rooms/update-room">
      <div>
        {name}
      </div>
      <div>
        {info}
      </div>
    </LenkepanelBase>
  );
};

export default Presentational;
