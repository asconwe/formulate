import React from 'react';

const base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://formulate-fyi.herokuapp.com';

class BroadcastLink extends React.Component {
    constructor() {
        super();

    }
    
    handleFocus(event) {
        event.target.select();
    }
    // testing
    render() {
        return (
            <input type="text" onFocus={this.handleFocus} value={`${base}/#/published/${this.props._id}`} />
        );
    }
}

export default BroadcastLink;