import { createStore, combineReducers } from 'redux';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authReducer.js';

const persistConfig={
    key:'root',
    storage,
    whitelist:['authReducer']
}

const appReducer = combineReducers({
	
	authReducer: authReducer,
});

const appRed=persistReducer(persistConfig,appReducer)

export const store=createStore(appRed)
export const persistor=persistStore(store)
