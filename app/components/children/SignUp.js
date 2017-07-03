import React from 'react'

import axios from 'axios'

class SignUp extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        axios.post('/auth/signup', { username, password }).then((data) => {
            console.log(data);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                    <input type="submit" value="Sign up" />
                </form>
            </div>
        )
    }
}

export default SignUp