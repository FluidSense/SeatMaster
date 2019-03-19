import React from 'react';
import itsyd from '../../assets/ITsyd.png';
import itvest from '../../assets/ITvest.png';
import realfaga4 from '../../assets/RealfagA4.png';
import './rooms.css';

const Presentational: React.FunctionComponent = (props) => {
  const { } = props;

  return (
    <div className="main-content">
      <img src={itvest} />

      <img src={itsyd} />

      <img src={realfaga4} id="a4" />
    </div>
  );
};

export default Presentational;
