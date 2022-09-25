import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
    };
  }

  handleChangeEmail = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validEmail(value));
  }

  handleChangePassword = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validPassword(value));
  }

  validEmail = (value) => {
    const validEmailRegex = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validEmail = validEmailRegex.test(value);
    this.setState({
      validEmail,
    });
  }

  validPassword = (value) => {
    const seis = 6;
    const validPassword = value.length >= seis;
    this.setState({
      validPassword,
    });
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;
    const { history, userDispatch } = this.props;
    return (
      <div>
        <input
          data-testid="email-input"
          placeholder="Email"
          type="text"
          id="email"
          name="email"
          value={ email }
          onChange={ this.handleChangeEmail }
        />
        <input
          data-testid="password-input"
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={ password }
          onChange={ this.handleChangePassword }
        />
        <button
          data-testid="submit-button"
          type="submit"
          disabled={ !validEmail || !validPassword }
          onClick={ () => {
            userDispatch(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (email) => dispatch(user(email)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  userDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
