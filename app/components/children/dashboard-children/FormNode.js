import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'

import DeleteForm from './formNode-children/DeleteForm'

const buttonFix = {

};

class FormNode extends React.Component {
    constructor() {
        super();
        this.state = {
            primeDelete: false
        }
        this.primeDelete = this.primeDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
    }

    primeDelete(event) {
        this.setState({
            primeDelete: true
        })
    }

    cancelDelete(event) {
        this.setState({
            primeDelete: false
        })
    }

    render() {
        return (
            <div className="col-sm-6 col-md-4 col-lg-3" >
                <div className="bordered">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3 style={{ "margin": "0.75rem" }} >{this.props.formTitle}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="button-group">
                                <Link to={`/form-builder/edit/${this.props._id}/${this.props.index}`}>
                                    <span>Edit</span>
                                </Link>
                                <button>Share</button>
                                <button onClick={this.primeDelete} data-_id={this.props._id}>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            {this.state.primeDelete ? (<DeleteForm _id={this.props._id} cancelDelete={this.cancelDelete} getUserForms={this.props.getUserForms}/> ) : (<div></div>) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormNode;