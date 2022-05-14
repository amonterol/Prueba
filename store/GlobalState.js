import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    modal: [],
    propertyTypes: [],
    owners: [],
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

  useEffect(() => {
    getData("owners").then((res) => {
      if (res.error) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }
      dispatch({ type: "ADD_OWNER", payload: res.owners });
    });
  });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
