import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DeleteForm from './formNode-children/DeleteForm';
import PublishForm from './formNode-children/PublishForm';

class FormNode extends React.Component {
    constructor() {
        super();
        this.state = {
            primeDelete: false
        };
        this.primeDelete = this.primeDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.publish = this.publish.bind(this);
        this.closePublished = this.closePublished.bind(this);
    }

    primeDelete() {
        this.setState({
            primeDelete: true,
            publish: false
        });
    }

    cancelDelete() {
        this.setState({
            primeDelete: false
        });
    }

    publish() {
        // should check to see if a form is already published
        axios.get(`/api/publish/${this.props._id}`).then((response) => {
            this.setState({
                primeDelete: false,
                publish: true
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    closePublished() {
        this.setState({
            publish: false
        });
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
                                <button onClick={this.publish}>Share</button>
                                <button onClick={this.primeDelete} data-_id={this.props._id}>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            {this.state.primeDelete ?
                                (<DeleteForm _id={this.props._id} cancelDelete={this.cancelDelete} getUserForms={this.props.getUserForms} />) :
                                this.state.publish ?
                                    (<PublishForm _id={this.props._id} close={this.closePublished} />) :
                                    (<div></div>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormNode;