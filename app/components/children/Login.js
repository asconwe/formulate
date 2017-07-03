import React from 'react'

import axios from 'axios'


class Login extends React.Component {
    constructor() {
        super();
        this.sate = {
            error: false
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        axios.post('/auth/login', { username, password }).then((data) => {
            console.log('here', data);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <button type="submit">login</button>
            </form>
        )
    }
}

export default Login