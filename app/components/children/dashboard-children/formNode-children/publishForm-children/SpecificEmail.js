import React from 'react';

import axios from 'axios';

class SpecificEmail extends React.Component {
    constructor() {
        super();
        this.state = {
            readySubmit: false,
            email: ""
        };
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        
    }
    
    handleClick() {
        axios.post(`/api/send/${this.props._id}`, { email: this.state.email }).then((response) => {
            this.setState({
                email: ''
            })
        }).catch((err) => {
            console.log(err); 
        })
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

export default SpecificEmail;