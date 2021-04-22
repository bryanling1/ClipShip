import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from 'components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './store/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
