import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case ACTIONS.ADD_PROPERTY_TYPE:
      return {
        ...state,
        propertyTypes: action.payload,
      };
    case ACTIONS.ADD_OWNER:
      return {
        ...state,
        owners: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
