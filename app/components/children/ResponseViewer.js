import React, { Component } from 'react';

import axios from 'axios'

class ResponseViewer extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            responses: []
        }
        this.getFormResponses = this.getFormResponses.bind(this);
    }

    componentDidMount() {
        this.getFormResponses();
    }


    getFormResponses() {
        axios.get(`/api/responses/${this.props.match.params.id}`).then((response) => {
            console.log(response);
            this.setState({
                title: response.data.outsiderResponses.formTitle,
                elements: response.data.outsiderResponses.elements,
                responses: response.data.outsiderResponses.responses,
                ready: true
            })
        }).catch((err) => {
            if (err) console.log(err);
            this.setState({
                responses: null,
                ready: true
            });
        });
    }


    render() {
        return (
            <div>
                {console.log(`Ready?${this.state.ready}`)}
                {this.state.ready ?
                    <table>
                        <caption>{this.state.title}</caption>
                        <thead>
                            <tr>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.elements.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-label="prompt">{element.elementTitle}</td>
                                        {this.state.responses.map((response, responseIndex) => {
                                            return <td key={responseIndex}>{response[index]}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table> :
                    <div></div>
                }
            </div>
        );
    }
}

export default ResponseViewer;