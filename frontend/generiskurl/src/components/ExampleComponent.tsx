import * as React from "react";
import { FunctionComponent } from "react";

interface IExampleProps {
  initAction: any;
}

export const ExampleComponent: FunctionComponent<IExampleProps> = (props) => {

  props.initAction();

  return <h1>Test</h1>;
};
