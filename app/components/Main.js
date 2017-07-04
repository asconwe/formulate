// Include React and React-Router
import React from 'react'
import { HashRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

// Import components
import Login from './children/Login'
import SignUp from './children/SignUp'
import Home from './children/home'
import Dashboard from './children/Dashboard'

// Create Main component
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            signedUp: undefined,
            loggedIn: undefined
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() { 
        axios.get('/api/data').then((response) => {
            console.log(response);
            this.setState({
                loggedIn: response.data.success,
                ready: true
            });
        }).catch((err) => {
            this.setState({
                loggedIn: false,
                ready: true
            });
        })
    }

    handleSignup(isSignUpSuccess) {
        this.setState({ signedUp: isSignUpSuccess });
        console.log(this.state);
    }

    handleLogin(isLogInSuccess) {
        this.setState({ loggedIn: isLogInSuccess });
        console.log(this.state);
    }

    handleLogout() {
        axios.get('/auth/logout').then((response) => {
            this.setState({ loggedIn: false });
        })
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <header>
                        <div className="container">
                            <a href="#" className="logo">Formulate</a>
                            {this.state.loggedIn ? <a href="#" className="button" onClick={this.handleLogout}>Logout</a>: <div/>}
                        </div>
                    </header>
                    {console.log(this.state.ready)}
                    {/*Once we have checked to see if the user is authenticated already*/}
                    {this.state.ready ? (<div className="container">
                        {/*If they are looged in, redirect to dashboard. Else, show home page*/}
                        <Route exact path='/' component={(props) => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <Home />
                        )} />
                        {/*If logged in, redirect to dashboard, else show login page*/}
                        <Route path='/login' component={(props) => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <Login handleResponse={this.handleLogin} />
                        )} />
                        {/*If logged in, redirect to dashboard, else show signup page*/}
                        <Route path='/signup' component={(props) => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <SignUp handleResponse={this.handleSignup} />
                        )} />
                        {/*If logged in, go to dashboard, else return to home page*/}
                        <Route path='/dashboard' component={(props) => (this.state.loggedIn ?
                            <Dashboard /> :
                            <Redirect to='/' />
                        )} />
                    </div>) : <div>{/*If we havent heard from the server yet, show an empty div*/}</div>}
                </div>
            </HashRouter>
        )
    }
}

// Export the component back for use in other files
export default Main