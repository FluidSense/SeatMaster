import * as React from 'react';

interface IExampleProps {
  initAction: () => any;
}

export const ExampleComponent: React.FunctionComponent<IExampleProps> = (props) => {

  props.initAction();

  return <h1>Test</h1>;
};
