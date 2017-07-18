import React, { Component } from 'react';

import axios from 'axios';

import OutsiderElement from './outsiderView-children/OutsiderElement';

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
        this.autoSave = debounce(this.autoSave.bind(this), 3000);
    }

    componentDidMount() {
        axios.get(`/api/pointedOutsiderForm/${this.props.match.params.refId}/${this.props.match.params.saveId}`).then((response) => {
            console.log(response);
            this.setState({
                formTitle: response.data.formTitle,
                elements: response.data.elements,
                response: response.data.responses
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
        }, () => {
            this.autoSave();
        });
    }

    handleSave(callback = () => {/*do nothing*/}) {
        const url = `/api/pointedSave/${this.props.match.params.refId}/${this.props.match.params.saveId}`;
        const submittedResponse = this.state.response;
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

    render() {
        return (
            <div className="row">
                <div style={whiteBackground} className="col-sm-12 col-md-10 col-md-offset-1">
                    <p style={saveStyle} >{this.state.save}</p>
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>{this.state.formTitle}</h2>
                        </div>
                    </div>
                    <div className="row">
                            {this.state.elements.length > 0 ?
                                this.state.elements.map((form, index) => <OutsiderElement setResponse={this.setResponse} form={form} response={this.state.response[index]} index={index} key={index} />) : <div></div>}
                        <div className="row">
                            <div className="col-sm-12">
                                <button onClick={this.handleSubmit}>Submit!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PointedOutsiderView;