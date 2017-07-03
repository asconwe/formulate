import React from 'react'

import { Link } from 'react-router-dom'

class Home extends React.Component {
    constructor() {
        super();

    }

    componentWillMount() {
        //Check if logged in and redirect 
    }

    render() {
        return (
            <div className="center">
                <br />
                <Link to='/login'><button className="home-button">Log in</button></Link><br />
                <Link to='/signup'><button className="home-button">Sign up</button></Link>
            </div>
        )
    }
}

export default Home