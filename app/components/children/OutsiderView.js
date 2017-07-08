import React, { Component } from 'react';

import axios from 'axios';

import OutsiderElement from './outsiderView-children/OutsiderElement'

class OutsiderView extends Component {
    constructor() {
        super();
        this.state = {
            formTitle: '',
            elements: []
        }
    }
    componentDidMount() {
        axios.get(`/api/outsiderForm/${this.props.match.params.id}`).then((response) => {
            console.log(response);
            this.setState({
                formTitle: response.data.formTitle,
                elements: response.data.elements
            })
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h2>{this.state.formTitle}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.elements.length > 0 ?
                            this.state.elements.map((form, index) => <OutsiderElement form={form} key={index} />) : <div></div>}
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <button>Submit!</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OutsiderView;