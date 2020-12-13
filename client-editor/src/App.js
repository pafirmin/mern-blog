import React, { createContext, useEffect, useReducer } from "react";
import authReducer from "./authReducer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";

const AuthContext = createContext();

const App = () => {
  const initialState = {
    isAuthenticated: false,
    token: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    token &&
      dispatch({
        type: "login",
        payload: {
          token: token,
        },
      });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div>
        <Header />
        {state.isAuthenticated ? <Home /> : <Login />}
      </div>
    </AuthContext.Provider>
  );
};

export { App, AuthContext };
