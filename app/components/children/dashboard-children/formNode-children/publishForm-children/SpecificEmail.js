import React from 'react';

import axios from 'axios';

class BroadCastLink extends React.Component {
    constructor() {
        super();
        this.state = {
            readySubmit: false,
            email: ""
        };
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClicl = this.handleClick.bind(this);
    }

    handleFocus(event) {
        this.setState({
            readySubmit: true
        });
    }

    handleChange(event) {
        this.setState({
            email: event.target.value
        });
    }
    
    handleBlur() {
        this.setState({
            readySubmit: false
        });
    }
    
    handleClick() {
        /*
        ** Post form _id and email to /api/sendFormEmail
        */
    }

    render() {
        return (
            <div className="input-group vertical">
                <input type="text" placeholder="Share with a specific email address" onFocus={this.handleFocus} onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.email}/>
                {this.state.readySubmit ? <button onClick={this.handleClick}>Send email</button> : <div></div>}
            </div>
        );
    }
}

export default BroadCastLink;