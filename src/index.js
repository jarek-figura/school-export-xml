import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { XMLProvider } from './components/contexts/XML';
import App from './components/business/App';
import * as serviceWorker from './serviceWorker';

const composeProviders = (children, ...providers) => providers.reduce(
  (result, Next) => <Next>{result}</Next>,
  children
);

ReactDOM.render(
  composeProviders(
    <App/>,
    XMLProvider
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
