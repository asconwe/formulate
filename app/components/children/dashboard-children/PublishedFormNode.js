import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import axios from 'axios'

import DeleteForm from './formNode-children/DeleteForm'
import PublishForm from './formNode-children/PublishForm'

class FormNode extends React.Component {
    constructor() {
        super();
        this.state = {
            primeDelete: false,
            share: false
        }
        this.primeDelete = this.primeDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.share = this.share.bind(this);
        this.closeShare = this.closeShare.bind(this);
    }

    primeDelete() {
        this.setState({
            primeDelete: true,
            publish: false
        })
    }

    cancelDelete() {
        this.setState({
            primeDelete: false
        })
    }

    share() {
        // should check to see if a form is already published
            this.setState({
                primeDelete: false,
                share: true
            })
    }

    closeShare() {
        console.log('in here')
        this.setState({
            share: false
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
                                <Link to={`/responses/${this.props._id}/${this.props.index}`}>
                                    <span>View Responses</span>
                                </Link>
                                <button onClick={this.share}>Share</button>
                                <button onClick={this.primeDelete} data-_id={this.props._id}>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            {this.state.primeDelete ?
                                <DeleteForm _id={this.props._id} cancelDelete={this.cancelDelete} getUserForms={this.props.getUserForms} /> :
                                this.state.share ?
                                    <PublishForm _id={this.props._id} close={this.closeShare} /> :
                                    <div></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormNode;