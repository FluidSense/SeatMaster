import * as React from 'react';
import { FunctionComponent } from "react";

type ExampleProps = {
  initAction: any,
}

export const ExampleComponent:FunctionComponent<ExampleProps> = (props) => {

  props.initAction();

  return <h1>Test</h1>;
}