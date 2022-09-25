import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { walletCurrencies, walletExpenses, walletDelete, walletEdit } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const object = await response.json();
    const siglas = Object.keys(object).filter((sigla) => sigla !== 'USDT');
    const { walletCurrenciesDispatch } = this.props;
    walletCurrenciesDispatch(siglas);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { walletExpensesDispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const moedas = await response.json();
    walletExpensesDispatch({
      description, value, currency, method, tag, exchangeRates: moedas });
    this.setState({
      description: '',
      value: '',
    });
  }

  render() {
    const { email, currencies, expenses, walletDeleteDispatch } = this.props;
    const { description, value, currency, tag, method } = this.state;
    return (
      <div>
        <header>
          <h4 data-testid="email-field">{ email }</h4>
          <h4 data-testid="total-field">
            { expenses.length === 0 || expenses === undefined ? 0
              : (expenses.map((expense) => parseFloat(expense.value)
              * parseFloat((expense.exchangeRates[expense.currency].ask))).reduce(
                (acc, curr) => acc + curr,
              )).toFixed(2) }
          </h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </header>
        <form>
          <div className="form-group">
            <label
              htmlFor="value"
            >
              Valor da despesa
              <input
                data-testid="value-input"
                className="form-control"
                type="text"
                id="value"
                name="value"
                value={ value }
                placeholder="Valor da despesa"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="form-group">
            <label
              htmlFor="value"
            >
              Descrição da despesa
              <input
                data-testid="description-input"
                className="form-control"
                type="text"
                id="value"
                name="description"
                value={ description }
                placeholder="Descrição da despesa"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="form-group">
            <label
              htmlFor="currency"
            >
              Moeda
              <select
                className="form-control"
                data-testid="currency-select"
                id="currency"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                { currencies.map((currencys) => (
                  <option key={ currencys } value={ currencys }>{currencys}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            Método
            <select
              className="form-control"
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          <div className="form-group">
            Categorias:
            <select
              className="form-control"
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button
              data-testid="add-button"
              type="button"
              className="submit-button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </div>
        </form>
        <table style={ { width: '100%' } }>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda de conversão</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id } id={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency]
                    .ask).toFixed(2) }
                </td>
                <td>
                  { (Number(expense.value) * Number(expense
                    .exchangeRates[expense.currency]
                    .ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    id={ expense.id }
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    id={ expense.id }
                    type="button"
                    onClick={ () => walletDeleteDispatch(expense.id) }
                    // onClick={ this.deleteClick }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  walletCurrenciesDispatch: (currencies) => dispatch(walletCurrencies(currencies)),
  walletExpensesDispatch: (expenses) => dispatch(walletExpenses(expenses)),
  walletDeleteDispatch: (expenses) => dispatch(walletDelete(expenses)),
  walletEditDispatch: (expenses) => dispatch(walletEdit(expenses)),
  walletExchangeRatesDispatch: (exchangeRates) => dispatch(walletExpenses(exchangeRates)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
  walletCurrenciesDispatch: PropTypes.func.isRequired,
  walletExpensesDispatch: PropTypes.func.isRequired,
  walletDeleteDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
