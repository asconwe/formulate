// Include React and React-Router
import React from 'react';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// Import components
import Heading from './children/Heading'
import Login from './children/Login';
import SignUp from './children/SignUp';
import Home from './children/Home';
import Dashboard from './children/Dashboard';
import FormBuilder from './children/FormBuilder';
import OutsiderView from './children/OutsiderView';
import PointedOutsiderView from './children//PointedOutsiderView';
import ResponseViewer from './children/ResponseViewer';
import HomeHeading from './children/HomeHeading';

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
        this.getSpecificForm = this.getSpecificForm.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getUserForms = this.getUserForms.bind(this);
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData() {
        axios.get('/api/data').then((response) => {
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
        this.setState({
            signedUp: isSignUpSuccess,
            ready: true
        });
    }

    handleLogin(isLogInSuccess) {
        this.setState({
            loggedIn: isLogInSuccess,
            ready: false
        });
        this.getUserData();
    }

    handleLogout(event) {
        console.log('in logout')
        axios.get('/auth/logout').then((response) => {
            this.setState({ loggedIn: false });
        });
    }

    getSpecificForm(index) {
        return this.state.forms[index]
    }

    render() {
        return (
            <HashRouter>
                <div>
                    {this.state.loggedIn ?
                        (
                            <Heading loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
                        ) :
                        (
                            <HomeHeading />
                        )}
                    {/*Once we have checked to see if the user is authenticated*/}
                    {this.state.ready ? (<div className="container" style={{ marginBottom: '60px' }}>
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
                        <Route path='/signup' component={({ history }) => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <SignUp history={history} handleResponse={this.handleSignup} />
                        )} />
                        {/*If logged in, go to dashboard, else return to home page*/}
                        <Route path='/dashboard' component={() => (this.state.loggedIn && this.state.verified ?
                            <Dashboard getUserForms={this.getUserForms} forms={this.state.forms} /> : this.state.loggedIn ?
                                <Verification /> :
                                <Redirect to='/' />
                        )} />
                        <Route path='/form-builder/:status/:target/:index?' component={({ match, history }) => (this.state.loggedIn && this.state.verified ?
                            <FormBuilder getUserForms={this.getUserForms} getFormToEdit={this.getSpecificForm} match={match} history={history} /> : this.state.loggedIn ?
                                <Verification /> :
                                <Redirect to='/' />
                        )} />
                        <Route path='/responses/:id/:index' component={({ match, history }) => (this.state.loggedIn && this.state.verified ?
                            <ResponseViewer getForm={this.getSpecificForm} match={match} history={history} /> : this.state.loggedIn ?
                                <Verification /> :
                                <Redirect to='/' />
                        )} />
                        <Route path='/published/:id' component={({ match }) => <OutsiderView match={match} />} />
                        <Route path='/pointed/:saveId/:refId' component={({ match }) => <PointedOutsiderView match={match} pointed />} />
                    </div>) : <div>{/*If we havent heard from the server yet, show an empty div*/}</div>}
                    <footer style={{ height: '50px', color: '#dde', padding: '1px', position: 'fixed', bottom: '0', width: '100%' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-10 col-md-offset-1">
                                    <p>&copy; 2017 a.conwell</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </HashRouter>
        );
    }
}

// Export the component back for use in other files
export default Main;