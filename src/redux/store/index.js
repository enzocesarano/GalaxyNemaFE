import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginMe from '../reducers/logged';

const bigReducer = combineReducers({
    loginMe: loginMe,

});

const store = configureStore({
  reducer: bigReducer,
});

export default store;