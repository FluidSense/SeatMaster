import EtikettBase from 'nav-frontend-etiketter';
import React from 'react';

interface IApplicationStatusProps {
  etikettType: 'suksess' | 'info' | 'advarsel' | 'fokus';
  etikettText: string;
}

const Presentational: React.FunctionComponent<IApplicationStatusProps> = (props) => {
  const { etikettType, etikettText } = props;

  return (
    <EtikettBase type={etikettType} >
      {etikettText}
    </EtikettBase>
  );
};

export default Presentational;
