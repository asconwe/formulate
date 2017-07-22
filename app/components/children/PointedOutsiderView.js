import React, { Component } from 'react';

import axios from 'axios';

import OutsiderElement from './outsiderView-children/OutsiderElement';
import formElementLibrary from './formBuilder-children/formElementLibrary';
import debounce from '../../util/debounce';

const whiteBackground = {
    background: "white"
};

const saveStyle = {
    float: 'right',
    color: 'grey'
};

class PointedOutsiderView extends Component {
    constructor() {
        super();
        this.state = {
            formTitle: '',
            elements: [],
            response: [],
            save: '',
            submitted: false
        };
        this.handleSave = this.handleSave.bind(this);
        this.setResponse = this.setResponse.bind(this);
        this.autoSave = debounce(this.autoSave.bind(this), 50);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getComponent = this.getComponent.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/pointedOutsiderForm/${this.props.match.params.refId}/${this.props.match.params.saveId}`).then((response) => {
            console.log('response===========', response);
            let content = [];
            if (response.data.responses !== undefined) {
                content = response.data.responses.content
            }
            this.setState({
                formTitle: response.data.formTitle,
                elements: response.data.elements,
                response: content
            }, () => (console.log(this.state)));
        }).catch((err) => {
            console.log(err);
        });
    }

    setResponse(index, data) {
        const newResponse = this.state.response;
        newResponse[index] = data;
        this.setState({
            response: newResponse
        }, () => {
            this.autoSave();
        });
    }

    handleSave(callback = () => {/*do nothing*/ }) {
        const url = `/api/pointedSave/${this.props.match.params.refId}/${this.props.match.params.saveId}`;
        const date = new Date();
        const submittedResponse = Object.assign({}, { content: this.state.response }, { date: date });
        this.setState({
            save: 'Saving'
        });
        axios.post(url, submittedResponse).then((response) => {
            const date = new Date();
            const hour = date.getHours();
            const minute = date.getMinutes();
            console.log(`Saved at ${hour}:${minute}`);
            this.setState({
                save: `Saved at ${hour}:${minute}`
            }, callback);
        }).catch((err) => {
            console.log(err);
        });
    }

    autoSave() {
        this.handleSave();
    }

    handleSubmit() {
        this.handleSave(() => {
            const url = `/api/pointedSubmit/${this.props.match.params.refId}/${this.props.match.params.saveId}`;
            axios.post(url, {}).then((response) => {
                this.setState({
                    submitted: true
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    
    getComponent(elementType, index, value = "") {
        console.log(elementType);
        const setResponse = (data) => {
            this.setResponse(index, data);
        }
        return formElementLibrary[elementType].getter({ editable: true, setResponse: setResponse, value });
    }

    renderOutsiderElement(form, index) {
        console.log('=============state===========', this.state)
        const content = this.state.response[index];
        return (
            <OutsiderElement setResponse={this.setResponse} form={form} index={index} key={index}> 
                {this.getComponent(form.elementType, index, content)}
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

export default PointedOutsiderView;