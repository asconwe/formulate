import React from 'react';

class BroadcastLink extends React.Component {
    constructor() {
        super();

    }
    
    handleFocus(event) {
        event.target.select();
    }

    render() {
        return (
            <input type="text" onFocus={this.handleFocus} value={`http://localhost:3000/#/published/${this.props._id}`} />
        );
    }
}

export default BroadcastLink;