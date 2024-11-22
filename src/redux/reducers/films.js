import { FILMS } from "../actions";

const initialState = {
  films: [],
}

const films = (state = initialState, action) => {
  switch (action.type) {
    case FILMS:
        return {
          ...state,
          films: action.payload,
        };
    default:
      return state;
  }
};

export default films