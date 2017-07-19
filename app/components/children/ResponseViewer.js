import React, { Component } from 'react';

import axios from 'axios'
import { LineChart, Line } from 'recharts';

import Modal from './responseViewer-children/Modal';

const width = 700
const height = 300
const margins = { left: 100, right: 100, top: 50, bottom: 50 }
const title = "User sample"
// chart series,
// field: is what field your data want to be selected
// name: the name of the field that display in legend
// color: what color is the line
const chartSeries = [
    {
        field: 'BMI',
        name: 'BMI',
        color: '#ff7f0e'
    }
]
// your x accessor
const x = function (d) {
    return d.index;
}
const data = [
    {
        name: "Lavon Hilll I",
        BMI: 20.57,
        age: 12,
        birthday: "1994-10-26T00:00:00.000Z",
        city: "Annatown",
        married: true,
        index: 1
    },
    {
        name: "Clovis Pagac",
        BMI: 24.28,
        age: 26,
        birthday: "1995-11-10T00:00:00.000Z",
        city: "South Eldredtown",
        married: false,
        index: 3
    },
    {
        name: "Gaylord Paucek",
        BMI: 24.41,
        age: 30,
        birthday: "1975-06-12T00:00:00.000Z",
        city: "Koeppchester",
        married: true,
        index: 5
    },
    {
        name: "Ashlynn Kuhn MD",
        BMI: 23.77,
        age: 32,
        birthday: "1985-08-09T00:00:00.000Z",
        city: "West Josiemouth",
        married: false,
        index: 6
    }
]

class ResponseViewer extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            responses: [],
        }
        this.getFormResponses = this.getFormResponses.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
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
            });
        }).catch((err) => {
            if (err) console.log(err);
            this.setState({
                responses: null,
                ready: true
            });
        });
    }

    handleRowClick(event) {
        const index = event.target.parentNode.dataset.index;
        console.log('===============', index, this.state.responses[index]);
        this.setState({
            modalContent: this.state.responses[index],
            showModal: true
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div className="col-sm-12 col-md-10 col-md-offset-1">
                {console.log(`Ready?${this.state.ready}`)}
                {this.state.ready ?
                    (
                        <div>
                            <table>
                                <caption>{this.state.title} - Responses</caption>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        {this.state.elements.map((element, index) => {
                                            return <th>{element.elementTitle}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.responses.map((response, index) => {
                                        return (
                                            <tr key={index} data-index={index} style={{ cursor: 'pointer' }} onClick={this.handleRowClick}>
                                                <td>{response.user}</td>
                                                {response.response.map((content, index2) => {
                                                    return <td key={index2}>{content.length > 20 ? content.slice(0, 17) + ' ...' : content}</td>
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <h3>Stats:</h3>
                            {/* Put some charts here!
                        *** 
                        *** submitted responses/completed responses - complete responses
                        *** word counts - common words
                        */}
                            {this.state.ready ? (

                                <LineChart width={400} height={400} data={[{ uv: 5 }, { uv: 100 }, { uv: 40 }, { uv: 60 }]}>
                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                </LineChart>) : <div />}
                            <h3>Hello</h3>
                            {this.state.showModal ? <Modal content={this.state.modalContent} elements={this.state.elements} closeModal={this.closeModal} /> : <div></div>}
                        </div>
                    ) :
                    <div></div>
                }
            </div>
        );
    }
}

export default ResponseViewer;