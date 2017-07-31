import React from 'react'
import { Link } from 'react-router-dom';

const logoClass = {
    float: "left",
    maxWidth: "36.3px",
    padding: "0px",
    margin: '0 0 0 0',
    top: "0px",
    left: "0px",
    position: "absolute",
    background: "none",
}

class Heading extends React.Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
        
    }
    
    handleLogout() {
        event.preventDefault();
        this.props.handleLogout()
    }
    
    render() {
        return (
            <header>
                <a href="#"><img className="logo" style={logoClass} src="/logo.svg" /></a>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-10 col-md-offset-1">
                            {this.props.loggedIn ? <span>
                                <Link style={{float: 'right'}} to="/dashboard" className="button">Dashboard</Link>
                                <a href="#" className="button" style={{float: 'right'}} onClick={this.handleLogout}>Logout</a>
                            </span> : <div /> }
                        </div>
                    </div>
                </div>
            </header>    
        )
    }
}

export default Heading;