import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//set default page and element pages load into
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
