import { Reducer } from "redux";
import { EXAMPLE_STRING } from "./action";

export type exampleState = {
  item1:string,
  nr1: number,
}

const initialState = {
  item1: "example",
  nr1: 1,
}

export const exampleReducer = (
  state:exampleState = initialState,
  action: any,
  ):exampleState => {
    const { type, payload } = action;
    switch(type) {
      case EXAMPLE_STRING:
        return {...state, [payload]: payload};
      default:
        return state;
    }
}