import React from 'react'

class Dashboard extends React.Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Dashboard</h1>
                        <button>+ New Form</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard