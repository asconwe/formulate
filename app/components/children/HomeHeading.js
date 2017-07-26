import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeHeading extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-10 col-md-offset-1">
                                <span className="logo" style={{ marginLeft: '20px' }}>Formulate</span>
                                <span>
                                    <Link to='/login' className="button">Login</Link>
                                    <Link to='/signup' className="button">Sign up</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default HomeHeading;