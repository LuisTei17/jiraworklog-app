import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginService from '../services/LoginService';

class PrivateRoute extends Component {

    constructor (props) {
        super(props);

        this.loginService = new LoginService();
        this.state = {'path': props.path, 'component': props.component, logged: false, route: <Redirect to="/login"/>};

        this.renderRoute = this.renderRoute.bind(this);
    };

    async renderRoute(RouteComponent) {
        try {
            const cookie = localStorage.getItem('cookie');        
            if (!cookie)
                throw new Error();            
            await this.loginService.checkAuth();
            
            this.setState({route: <RouteComponent />});
        } catch (error) {
            return <Redirect to="/login"/>;
        }
    }

    async componentWillUpdate() {
        await this.renderRoute(this.state.component)
    }

    render() {
        return (
            <div>
                <Route path={this.state.path} render={() => this.state.route} />

            </div>
        );
    }
}

export default PrivateRoute;