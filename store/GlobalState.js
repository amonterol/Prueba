import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    modal: [],
    propertyTypes: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    getData("propertyTypes").then((res) => {
      if (res.error) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }
      dispatch({ type: "ADD_PROPERTY_TYPE", payload: res.propertyTypes });
    });
  });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
