import KnappBase, { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { IApplication } from '../Application';

interface IProps {
  applications: IApplication[];
  approve: (numbers: number[]) => void;
}

const Approval: React.FunctionComponent<IProps> = (props) => {
  const { applications, approve } = props;

  const approveAllStudents = () => {
    const approved = applications.filter(app => app.seat ? true : false);
    const ids = approved.map(app => app.id);
    approve(ids);
  };

  return (
    <div>
      <KnappBase type="flat" onClick={approveAllStudents}/>
    </div>
  );
};

export default Approval;
