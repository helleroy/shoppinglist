import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

let updateFound: boolean = false;

ReactDOM.render(
  <App updateFound={updateFound} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
const swConfig = {
  onUpdate: (registration: ServiceWorkerRegistration) => {
    updateFound = true;
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    updateFound = false;
  },
};
serviceWorker.register(swConfig);
