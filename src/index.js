import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { initGA } from './utils/tracking';
import { preserveUser } from './utils/helpers/tokenChecker'
import store from './utils/store';

(function initAnalytics() {
  initGA('UA-159089625-1');
})();

window.addEventListener('beforeunload', preserveUser());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
