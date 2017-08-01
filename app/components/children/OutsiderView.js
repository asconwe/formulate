import React, { Component } from 'react';

import axios from 'axios';

import OutsiderElement from './outsiderView-children/OutsiderElement';
import formElementLibrary from './formBuilder-children/formElementLibrary';

const whiteBackground = {
    background: "white"
};

class OutsiderView extends Component {
    constructor() {
        super();
        this.state = {
            formTitle: '',
            elements: [],
            response: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.getComponent = this.getComponent.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/outsiderForm/${this.props.match.params.id}`).then((response) => {
            this.setState({
                formTitle: response.data.formTitle,
                elements: response.data.elements
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    setResponse(index, data) {
        const newResponse = this.state.response;
        newResponse[index] = data;
        this.setState({
            response: newResponse
        });
    }

    handleSubmit(event) {
        const date = new Date();
        const url = `api/outsiderSubmit/${this.props.match.params.id}`;
        const submittedResponse = Object.assign({}, { content: this.state.response }, { date: date });
        axios.post(url, submittedResponse).then((response) => {
            this.setState({
                submitted: true
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    
    getComponent(elementType, index) {
        const setResponse = (data) => {
            this.setResponse(index, data);
        }
        return formElementLibrary[elementType].getter({ editable: true, setResponse: setResponse });
    }
    
    renderOutsiderElement(form, index) {
        return (
            <OutsiderElement setResponse={this.setResponse} form={form} index={index} key={index}> 
                {this.getComponent(form.elementType, index)}
            </OutsiderElement>
        );
    }

    render() {
        return (
            <div className="row">
                <div style={whiteBackground} className="col-sm-12 col-md-10 col-md-offset-1">
                    {this.state.submitted ? <h2>Congratulations! Your form was submitted</h2> :
                        (<div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h1>{this.state.formTitle}</h1>
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                {this.state.elements.length > 0 ?
                                    this.state.elements.map((form, index) => this.renderOutsiderElement(form, index)) : <div></div>}
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <button onClick={this.handleSubmit}>Submit!</button>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default OutsiderView;