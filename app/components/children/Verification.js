import React, { Component } from 'react';
import axios from 'axios';

class Verification extends Component {
    constructor() {
        super();
        this.state = { 
            emailReSent: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        axios.get('/auth/sendemail').then((data) => {
            this.setState({
                emailReSent: true
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <div className="row">   
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        Please verify your email address.
                        {!this.state.emailReSent ?
                            <div>Click <a onClick={this.handleClick} >here</a> to resend verification email</div> :
                            <div>Check your email for the verification link!</div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Verification;