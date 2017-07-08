import React from 'react';

import axios from 'axios';

class PublishForm extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <div className="input-group vertical">
                    <input type="text" value={`http://localhost:3000/#/published/${this.props._id}`} />
                    <button onClick={this.props.closePublished}>close</button>
                </div>
            </div>
        )
    }
}

export default PublishForm