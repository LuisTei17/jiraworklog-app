import React, { Component, lazy, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginService from '../services/LoginService';

class PrivateRoute extends Component {

    constructor (props) {
        super(props);

        this.loginService = new LoginService();
        this.state = {'path': props.path, 'component': props.component, logged: false};

        this.renderRoute = this.renderRoute.bind(this);
    };

    renderRoute(RouteComponent) {
        try {
            const cookie = localStorage.getItem('cookie');        
            if (!cookie)
                throw new Error();            
            
            return <RouteComponent />;
        } catch (error) {
            return <Redirect to="/" />
        }
    }

    render() {

        return (
            <div>
                <Route path={this.state.path} render={() => this.renderRoute(this.state.component)}/>
            </div>
        );
    }
}

export default PrivateRoute;