import React from 'react'

class SignUp extends React.Component {
    constructor() {
        super()

    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                    <input type="submit" value="Sign up"/>
                </form>
            </div>
        )
    }
}

export default SignUp