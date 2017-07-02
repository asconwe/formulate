// Include React and React-Router
import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'

// Import components
import Login from './children/Login'
import SignUp from './children/SignUp'

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
                <div className="container">
                    <Link to='/login'><button>Log in</button></Link>
                    <Link to='/signup'><button>Sign up</button></Link>
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={SignUp} />
                </div>
            </HashRouter>
        )
    }
}

// Export the component back for use in other files
export default Main