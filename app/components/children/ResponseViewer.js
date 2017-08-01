import React, { Component } from 'react';

import axios from 'axios'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import Modal from './responseViewer-children/Modal';

class ResponseViewer extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            responses: [],
        };
        this.getFormResponses = this.getFormResponses.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        this.getFormResponses();
    }

    getFormResponses() {
        axios.get(`/api/responses/${this.props.match.params.id}`).then((response) => {
            const getDateData = () => {
                const dates = {};
                response.data.outsiderResponses.responses.map(({ response }) => {
                    const date = response.date.slice(0, 10);
                    if (dates[date]) {
                        return dates[date].value += 1;
                    } else {
                        return dates[date] = { date: date, value: 1 };
                    }
                });
                const dateArr = Object.values(dates);
                return dateArr;
            };
            this.setState({
                title: response.data.outsiderResponses.formTitle,
                elements: response.data.outsiderResponses.elements,
                responses: response.data.outsiderResponses.responses,
                wordCount: response.data.outsiderResponses.wordCounts.filter((wordCount) => wordCount.key.length > 2),
                responseByDate: getDateData(),
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
                {this.state.ready ?
                    (
                        <div>
                            <table>
                                <caption>{this.state.title} - Responses</caption>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        {this.state.elements.map((element, index) => {
                                            return <th key={index}>{element.elementTitle}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.responses.map((response, index) => {
                                        return (
                                            <tr key={index} data-index={index} style={{ cursor: 'pointer' }} onClick={this.handleRowClick}>
                                                <td>{response.user}</td>
                                                {response.response.content.map((content, index2) => {
                                                    return <td key={index2 + 1000}>{content.length > 20 ? content.slice(0, 17) + '...' : content}</td>
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <h3>Stats:</h3>
                            {this.state.ready ? (
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <h3>Frequently used words</h3>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <BarChart width={400} height={400} margin={{ left: 10 }} layout="vertical" data={this.state.wordCount.slice(0, 5)}>
                                                <XAxis type="number" allowDecimals={false} orientation="top" />
                                                <YAxis type="category" dataKey="key" mirror/>
                                                <Tooltip wrapperStyle={{ backgroundColor: '#ccc' }} />
                                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                                <Bar type="monotone" dataKey="value" stroke="#8884d8" fill="rgba(255, 255, 255, 0.0)" /> />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <h3>Responses by date</h3>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <LineChart width={730} height={250} data={this.state.responseByDate} 
                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <XAxis dataKey="date" />
                                                    <YAxis />
                                                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                                                    <CartesianGrid stroke="#ccc" fill="#8884d8" strokeDasharray="5 5" />
                                                    <Line dataKey="value"/>
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            ) : <div />}
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