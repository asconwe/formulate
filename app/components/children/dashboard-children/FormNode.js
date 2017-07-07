import React from 'react'
import { Link } from 'react-router-dom'

class FormNode extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="col-sm-6 col-md-4 col-lg-3" >
                <div className="bordered">
                    <Link to={`/form-builder/edit/${this.props._id}/${this.props.index}`}>
                        <h3>{this.props.formTitle}</h3>
                    </Link>
                </div>
            </div>
        )
    }
}

export default FormNode;