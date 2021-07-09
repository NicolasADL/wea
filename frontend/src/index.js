import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './redux/store.js';


ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App/>
        </PersistGate>
        
    </Provider>, document.getElementById("root"))