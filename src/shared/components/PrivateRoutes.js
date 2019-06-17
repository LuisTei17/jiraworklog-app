import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginService from '../services/LoginService';

class PrivateRoute extends Component {

    constructor (props) {
        super(props);

        this.loginService = new LoginService();
        this.state = {'path': props.path, 'component': props.component, logged: false};
    };

    async componentDidMount() {
        this.loginService.checkAuth()        
        
    } 

    render() {
        return (
            <Route path={this.state.path} component={this.state.component} />
        );
    }
}

export default PrivateRoute;