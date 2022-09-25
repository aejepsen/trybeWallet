import { LOGIN_USER } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN_USER:
    return { ...state,
      email: action.email };
  default:
    return state;
  }
}

export default user;

// Esse reducer será responsável por tratar as informações da pessoa usuária
