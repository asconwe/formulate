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
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <Link to='/login'><button className="home-button">Log in</button></Link>
                        <Link to='/signup'><button className="home-button">Sign up</button></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <hr/>
                        <h2 id="form-builder-response-manager">Form builder, response manager</h2>
                        <p>Formulate is a streamlined form-builder and response-manager, designed to make the process of sharing surveys or soliciting applications a breeze for everyone involved. Organizations can easily build custom forms and view, manage, and analyze responses, while, on the other end, users just fill out and click submit. Gone are the days of the emailed PDF that the user forgot to save before they sent back.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home