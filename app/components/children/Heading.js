import React from 'react'
import { Link } from 'react-router-dom';

const logoClass = {
    float: "left",
    maxWidth: "33px",
    padding: "1px",
    margin: '1px 0 0 0',
    top: "0px",
    position: "absolute",
    background: "white",
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
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-10 col-md-offset-1">
                            <a href="#"><img className="logo" style={logoClass} src="/logosmall.svg" /></a>
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