import React, { Component } from 'react';

class Verification extends Component {
    constructor() {
        super();
        
    }

    handleClick() {
        
    }

    render() {
        return (
            <div>
                <div className="row">   
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        Please verify your email address.
                        Click <a onClick={this.handleClick} >here</a> to resend verification email
                    </div>
                </div>
            </div>
        );
    }
}

export default Verification;