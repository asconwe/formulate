import React from 'react'
import { Link } from 'react-router-dom'

import FormNode from './dashboard-children/FormNode'

class Dashboard extends React.Component {
    constructor() {
        super();

    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Dashboard</h1>
                        <Link to='/form-builder/new/form'><button>+ New Form</button></Link>
                    </div>  
                    {this.props.forms.map((form, index) => (<FormNode
                        _id={form._id}    
                        formTitle={form.formTitle}
                        index={index}
                        key={index}
                    />))}
                </div>
            </div>
        )
    }
}

export default Dashboard