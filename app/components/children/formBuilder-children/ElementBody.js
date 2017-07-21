import React, { Component } from 'react';

import formElementLibrary from './formElementLibrary'

class ElementBody extends Component {
    constructor() {
        super();
    }
    renderElementFromLibrary() {
        console.log('=========', this.props);
        return formElementLibrary[this.props.type].getter(this.props)
    }
    render() {
        return (
            <div style={{margin: "0 7px 7px 7px"}}>
                {this.renderElementFromLibrary()}
            </div>
        );
    }
}

export default ElementBody;