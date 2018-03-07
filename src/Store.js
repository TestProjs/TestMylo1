import { combineReducers } from "redux";
import Immutable from "seamless-immutable";
import { UserReducer } from "./UserRedux";
import { createStore, compose } from "redux";

export function configureStore() {
  const rootReducer = combineReducers(Immutable({ users: UserReducer }));
  return createStore(rootReducer);
}
