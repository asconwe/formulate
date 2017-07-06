import React from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            forms: []
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Dashboard</h1>
                        <Link to='/form-builder'><button>+ New Form</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard