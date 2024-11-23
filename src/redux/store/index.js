import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginMe from '../reducers/logged';
import films from '../reducers/films';
import proiezioni from '../reducers/films';

const bigReducer = combineReducers({
    loginMe: loginMe,
    films: films,
    proiezioni: proiezioni,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;