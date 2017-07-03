// Include React and React-Router
import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'

// Import components
import Login from './children/Login'
import SignUp from './children/SignUp'
import Home from './children/home'

// Create Main component
class Main extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <header>
                        <div className="container">
                            <a href="#" className="logo">Formulate</a>
                        </div>
                    </header>
                    <div className="container">
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={Login} />
                        <Route path='/signup' component={SignUp} />
                    </div>
                </div>
            </HashRouter>
        )
    }
}

// Export the component back for use in other files
export default Main