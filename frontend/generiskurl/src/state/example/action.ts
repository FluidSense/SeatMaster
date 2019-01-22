
export const EXAMPLE_STRING = 'EXAMPLE_HAPPENED';

export type exampleAction = {
  type: typeof EXAMPLE_STRING,
  payload: string,
}

export const exampleActionHappened = (name: string):exampleAction => { 
  return {type: EXAMPLE_STRING, payload: name}
};