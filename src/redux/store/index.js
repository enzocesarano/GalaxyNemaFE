import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginMe from '../reducers/logged';
import films from '../reducers/films';
import proiezioni from '../reducers/films';
import senzaproiezioni from '../reducers/films';
import { selectedTickets } from '../reducers/ticket';
import news from '../reducers/news';
import { selectedProiezione } from '../reducers/selectedProiezione';

const bigReducer = combineReducers({
    loginMe: loginMe,
    films: films,
    proiezioni: proiezioni,
    senzaproiezioni: senzaproiezioni,
    selectedTickets: selectedTickets,
    news: news,
    selectedProiezione: selectedProiezione
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;