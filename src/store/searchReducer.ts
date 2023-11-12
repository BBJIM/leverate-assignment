// Action types
const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

// Initial state
const initialState = {
  searchTerm: '',
};

// Reducer function
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

// Action creators
export const setSearchTerm = (term: string) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export default searchReducer;