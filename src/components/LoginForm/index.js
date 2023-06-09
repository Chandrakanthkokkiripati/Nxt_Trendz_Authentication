// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  submitErrorMsg = errMsg => {
    this.setState({showError: true, errorMsg: errMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.submitErrorMsg(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    return (
      <div className="login-form-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="form-logo-image-mobile"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="login-image"
        />
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="form-logo-image"
          />
          <form className="form-input-container" onSubmit={this.submitForm}>
            <label className="label-element" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="input-element"
              placeholder="Username"
              type="text"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <br />
            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="input-element"
              placeholder="Password"
              type="password"
              id="password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button className="submit-btn" type="submit">
              Login
            </button>
            {showError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
