import {
  REGISTER_CURRENCIES,
  REGISTER_EXPENSES,
  REGISTER_DELETE,
  REGISTER_EDIT,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case REGISTER_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case REGISTER_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.expenses }],
    });

  case REGISTER_DELETE: {
    const { id } = action;
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== id),
    });
  }

  case REGISTER_EDIT:
    return ({
      ...state,
      expenses: { ...state.expenses
        .find((expense) => expense.id === action.expenses.id),
      ...action.expenses },
    });

  default:
    return state;
  }
}

export default wallet;
