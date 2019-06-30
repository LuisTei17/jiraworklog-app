import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css';
import LoginService from '../../shared/services/LoginService';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor (props) {
        super(props)

        this.state = {logged: false, username: '', password: '', open: false, redirect: null};

        this.loginService = new LoginService();

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClose () {
        this.setState({open: false});
    }

    async login () {
        try {
            const data = {
                'username': this.state.username,
                'password': this.state.password
            };

            await this.loginService.login(data);
            this.setState({redirect: <Redirect to="/dashboard" />})
        } catch (err) {
            this.setState({open: true});
        }

    }

    render() {
        return (
            <div className="loginPage">
                {this.state.redirect}
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <SnackbarContent
                        aria-describedby="client-snackbar"
                        message={
                            <span>
                                Usuário/Senha inválido
                            </span>
                        }
                    />
                </Snackbar>
                <div className="form-login">
                    <h1>Login</h1>
                    <form noValidate autoComplete="off">
                        <TextField
                            className="form-field"
                            label="Username"
                            name="username"
                            onChange={this.handleChange}
                            />
                        <TextField
                            className="form-field"
                            label="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            />
                        <Button
                            className="form-field form-button"
                            variant="contained"
                            color="primary"
                            onClick={this.login}
                            >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;