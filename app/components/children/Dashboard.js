import React from 'react'

class Dashboard extends React.Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>You made it!</p>
                <p>{token}</p>
            </div>
        )
    }
}