import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginMe from '../reducers/logged';
import films from '../reducers/films';
import proiezioni from '../reducers/films';
import senzaproiezioni from '../reducers/films';

const bigReducer = combineReducers({
    loginMe: loginMe,
    films: films,
    proiezioni: proiezioni,
    senzaproiezioni: senzaproiezioni,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;