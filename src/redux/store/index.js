import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginMe from '../reducers/logged';
import films from '../reducers/films';

const bigReducer = combineReducers({
    loginMe: loginMe,
    films: films
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;