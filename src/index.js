import React from "react";
import ReactDOM from "react-dom";
import UserPage from "./UserPage";
import { Provider } from "react-redux";
import { configureStore } from "./Store";
import "./index.css";

const App = () => (
  <Provider store={configureStore()}>
    <UserPage />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
