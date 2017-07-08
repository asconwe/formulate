import React, { Component } from 'react';

import axios from 'axios';

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
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <div>
                {console.log(this.state)}
            </div>
        );
    }
}

export default OutsiderView;