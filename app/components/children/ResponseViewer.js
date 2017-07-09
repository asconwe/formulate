import React, { Component } from 'react';

class ResponseViewer extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            responses: responses,
        }
        this.getFormResponses = this.getFormResponses.bind(this);
    }
    
    componentDidMount() {
        this.props.getForm(index);
        this.getFormResponses();
    }
    

    getFormResponses() {
        axios.get(`/api/responses/${this.props.match.params.id}`).then((response) => {
            console.log(response);
            this.setState({
                responses: response.data,
                success: true,
                ready: true
            })
        }).catch((err) => {
            if (err) console.log(err);
            this.setState({
                success: false,
                ready: true
            });
        });
    }


    render() {
        return (
            <div>
                <table>
                    <caption>People</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Alias</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Name">Chad</td>
                            <td data-label="Surname">Wilberts</td>
                            <td data-label="Alias">MrOne</td>
                        </tr>
                        <tr>
                            <td data-label="Name">Adam</td>
                            <td data-label="Surname">Smith</td>
                            <td data-label="Alias">TheSmith</td>
                        </tr>
                        <tr>
                            <td data-label="Name">Sophia</td>
                            <td data-label="Surname">Canderson</td>
                            <td data-label="Alias">Candee</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResponseViewer;