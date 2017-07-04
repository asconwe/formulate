// Include React and React-Router
import React from 'react'
import { HashRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

// Import components
import Login from './children/Login'
import SignUp from './children/SignUp'
import Home from './children/home'

// Create Main component
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            signedUp: false,
            loggedIn: false
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillMount() { 
        axios.get('/api/data').then((data) => {
            console.log(data);
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
            this.setState({ loggedIn: !response.data.success })
        })
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <header>
                        <div className="container">
                            <a href="#" className="logo">Formulate</a>
                            <a href="#" onClick={this.handleLogout}>Log out</a>
                        </div>
                    </header>
                    <div className="container">
                        <Route exact path='/' component={(props) => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <Home />
                        )} />
                        <Route path='/login' component={(props) => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <Login handleResponse={this.handleLogin} />
                        )} />
                        <Route path='/signup' component={(props) => (this.state.loggedIn ?
                            <Redirect to="/dashboard" /> :
                            <SignUp handleResponse={this.handleSignup} />
                        )} />
                    </div>
                </div>
            </HashRouter>
        )
    }
}

// Export the component back for use in other files
export default Main