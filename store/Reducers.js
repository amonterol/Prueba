import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.ADD_PROPERTY_TYPE:
      return {
        ...state,
        propertyTypes: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
