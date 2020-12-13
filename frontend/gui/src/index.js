// react imports
import React from 'react';
import ReactDOM from 'react-dom';

// local imports
import './index.css';
import App from './App';
import store from "./redux/store";
// import * as serviceWorker from './serviceWorker';

// third-party imports
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css"


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
