export const REGISTER_CURRENCIES = 'REGISTER_CURRENCIES';
export const REGISTER_EXPENSES = 'REGISTER_EXPENSES';
export const REGISTER_DELETE = 'REGISTER_DELETE';
export const REGISTER_EDIT = 'REGISTER_EDIT';
export const LOGIN_USER = 'LOGIN_USER';

export const walletCurrencies = (action) => ({
  type: REGISTER_CURRENCIES,
  currencies: action,
});

export const walletExpenses = (action) => ({
  type: REGISTER_EXPENSES,
  expenses: action,
});

export const walletDelete = (action) => ({
  type: REGISTER_DELETE,
  id: action,
});

export const walletEdit = (action) => ({
  type: REGISTER_EDIT,
  user: action,
});

export const user = (action) => ({
  type: LOGIN_USER,
  email: action,
});

export const fetchExchangeRates = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  delete exchangeRates.USDT;
  return dispatch(walletExpenses(exchangeRates));
};
