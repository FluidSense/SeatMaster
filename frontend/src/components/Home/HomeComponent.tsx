import * as React from 'react';

interface IExampleProps {
  initAction: () => any;
}

export const HomeComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return <h1>Test</h1>;
};
