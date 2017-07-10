import React from 'react'

import axios from 'axios'

class SignUp extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        axios.post('/auth/signup', { username, password }).then(this.handleResponse)
    }

    handleResponse(response) {
        this.props.handleResponse(response.data.success);
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Sign up</h2>
                        <div className="input-group vertical">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" />
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" />
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp