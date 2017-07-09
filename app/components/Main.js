// Include React and React-Router
import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Import components
import Login from './children/Login';
import SignUp from './children/SignUp';
import Home from './children/Home';
import Dashboard from './children/Dashboard';
import FormBuilder from './children/FormBuilder';
import OutsiderView from './children/OutsiderView';
import ResponseViewer from './children/ResonseViewer'

// Create Main component
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            signedUp: undefined,
            loggedIn: undefined,
            forms: []
        };
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.getFormToEdit = this.getFormToEdit.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getUserForms = this.getUserForms.bind(this);
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData() {
        axios.get('/api/data').then((response) => {
            console.log(response);
            this.getUserForms();
            
        }).catch((err) => {
            if (err) console.log(err);
            this.setState({
                loggedIn: false,
                ready: true
            });
        });
    }

    getUserForms() {
        axios.get('/api/data').then((response) => {
            console.log(response);
            this.setState({
                loggedIn: response.data.success,
                forms: response.data.forms,
                ready: true
            });
        }).catch((err) => {
            if (err) console.log(err);
            this.setState({
                loggedIn: false,
                ready: true
            });
        });
    }

    handleSignup(isSignUpSuccess) {
        this.setState({ signedUp: isSignUpSuccess });
    }

    handleLogin(isLogInSuccess) {
        this.setState({ loggedIn: isLogInSuccess });
    }

    handleLogout() {
        axios.get('/auth/logout').then((response) => {
            this.setState({ loggedIn: false });
        });
    }

    getFormToEdit(index) {
        return this.state.forms[index]
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <header>
                        <div className="container">
                            <a href="#" className="logo">Formulate</a>
                            {this.state.loggedIn ? <a href="#" className="button" onClick={this.handleLogout}>Logout</a> : <div />}
                        </div>
                    </header>
                    {/*Once we have checked to see if the user is authenticated*/}
                    {this.state.ready ? (<div className="container">
                        {/*If they are looged in, redirect to dashboard. Else, show home page*/}
                        <Route exact path='/' component={() => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <Home />
                        )} />
                        {/*If logged in, redirect to dashboard, else show login page*/}
                        <Route path='/login' component={() => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <Login handleResponse={this.handleLogin} />
                        )} />
                        {/*If logged in, redirect to dashboard, else show signup page*/}
                        <Route path='/signup' component={() => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <SignUp handleResponse={this.handleSignup} />
                        )} />
                        {/*If logged in, go to dashboard, else return to home page*/}
                        <Route path='/dashboard' component={() => (this.state.loggedIn ?
                            <Dashboard getUserForms={this.getUserForms} forms={this.state.forms} /> :
                            <Redirect to='/' />
                        )} />
                        <Route path='/form-builder/:status/:target/:index?' component={({ match, history }) => (this.state.loggedIn ?
                            <FormBuilder getUserForms={this.getUserForms} getFormToEdit={this.getFormToEdit} match={match} history={history} /> :
                            <Redirect to='/' />
                        )} />
                        <Route path='/responses/:form' component={({ match, history }) => (this.state.loggedIn ?
                            <ResponseViewer match={match} history={history} /> :
                            <Redirect to='/' />
                        )} />
                        <Route path='/published/:id' component={({ match }) => <OutsiderView match={match} />} />
                    </div>) : <div>{/*If we havent heard from the server yet, show an empty div*/}</div>}
                </div>
            </HashRouter>
        );
    }
}

// Export the component back for use in other files
export default Main;