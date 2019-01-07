import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

class Login extends Component {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: '',
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }

    render() {
        const { login, email, password, name } = this.state

        return (
            <div>
                <div className="nk-box-3 bg-dark-1">
                    <h2 className="nk-title h3 text-center">{login ? 'Login' : 'Registrarse'}</h2>
                    <div className="nk-gap-1"></div>
                    {!login && (
                        <input
                            className="form-control required"
                            placeholder="Nombre de usuario *"
                            value={name}
                            onChange={e => this.setState({ name: e.target.value })}
                            type="text"
                        />
                    )}

                    <input
                        className="form-control required"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        type="email"
                        placeholder="Email *"
                    />

                    <input
                        className="form-control required"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })}
                        type="password"
                        placeholder="Password"
                    />

                    <Mutation
                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={{ email, password, name }}
                        onCompleted={data => this._confirm(data)}
                        OnError
                    >
                        {mutation => (
                            <div className="nk-btn nk-btn-lg link-effect-4"
                                 onClick={mutation}>
                                {login ? 'Login' : 'Registrarse'}
                            </div>
                        )}
                    </Mutation>

                    <div
                        className="nk-btn nk-btn-lg link-effect-4"
                        onClick={() => this.setState({ login: !login })}
                    >
                        {login
                            ? 'No tienes una cuenta?'
                            : 'Ya estas registrado?'}
                    </div>

                    <div className="nk-form-response-success"></div>
                    <div className="nk-form-response-error"></div>
                </div>
            </div>
        )
    }
}

export default Login