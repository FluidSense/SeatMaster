
export const EXAMPLE_STRING = "EXAMPLE_HAPPENED";

export interface IExampleAction {
  type: typeof EXAMPLE_STRING;
  payload: string;
}

export const exampleActionHappened = (name: string): IExampleAction => {
  return { type: EXAMPLE_STRING, payload: name };
};
