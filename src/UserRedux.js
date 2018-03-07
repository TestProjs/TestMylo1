import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import userData from "./users.json";
import { CATEGORIES, SORT_METHOD } from "./Enums";
import _ from "lodash";

export const UserActionTypes = {
  FILTER: "FILTER",
  SORT: "SORT"
};

const idForCategory = category => {
  switch (category) {
    case CATEGORIES.CAT1.value:
      return CATEGORIES.CAT1.id;
    case CATEGORIES.CAT2.value:
      return CATEGORIES.CAT2.id;
    case CATEGORIES.CAT3.value:
      return CATEGORIES.CAT3.id;
    default:
      return CATEGORIES.NONE.id;
  }
};
const indexAsReceived = data => {
  var index = 0;
  return _.map(data, value => {
    value.originalOrder = index++;
    return value;
  });
};

export const UserActions = {
  sort: sortMethod => ({
    type: UserActionTypes.SORT,
    sortMethod
  }),
  filter: filterMethod => ({
    type: UserActionTypes.FILTER,
    filterMethod
  })
};

const INITIAL_STATE = Immutable({
  data: indexAsReceived(userData)
});

export const UserReducer = createReducer(INITIAL_STATE, {
  [UserActionTypes.FILTER]: (state, action) => {
    var data = sortUsers(userData, state.sortMethod);
    if (action.filterMethod != "") {
      data = _.filter(data, user => {
        return user.category == action.filterMethod;
      });
    }
    return state.merge({ data });
  },
  [UserActionTypes.SORT]: (state, action) => {
    var data = sortUsers(state.data, action.sortMethod);

    return state.merge({ data, sortMethod: action.sortMethod });
  }
});

const sortUsers = (users, sortMethod) => {
  var sort = "";
  switch (_.toNumber(sortMethod)) {
    case SORT_METHOD.ALPHABETICAL.id:
      sort = "name";
      break;
    case SORT_METHOD.PRIORITY.id:
      sort = "priority";
      break;
    default:
      sort = "originalOrder";
  }
  return _.sortBy(users, [sort]);
};
