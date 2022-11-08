import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import UserReducers from "../src/Feature/UserSlice";
import { UserContextProvider } from "./Component/Utilities/Context";

const store = configureStore({
  reducer: {
    UserInfo: UserReducers,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="cc">

  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <div >

        <App />
        </div>
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
