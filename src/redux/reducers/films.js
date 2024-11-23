import { FILMS, PROIEZIONI } from "../actions";

const initialState = {
  films: [],
  proiezioni: [],
}

const films = (state = initialState, action) => {
  switch (action.type) {
    case FILMS:
        return {
          ...state,
          films: action.payload,
        };
        case PROIEZIONI:
        return {
          ...state,
          proiezioni: action.payload,
        };
    default:
      return state;
  }
};

export default films