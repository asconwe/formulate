import React from 'react'
import { Link } from 'react-router-dom'

import FormNode from './dashboard-children/FormNode'
import PublishedFormNode from './dashboard-children/PublishedFormNode'

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
                    {this.props.forms.map((form, index) => {
                        console.log('Form published?', form.published)
                        return (
                            !form.published ?
                            <FormNode
                                _id={form._id}
                                formTitle={form.formTitle}
                                index={index}
                                getUserForms={this.props.getUserForms}
                                key={index}
                            /> :
                            <PublishedFormNode
                                _id={form._id}
                                formTitle={form.formTitle}
                                index={index}
                                getUserForms={this.props.getUserForms}
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Dashboard