import React from 'react';

import axios from 'axios';

import BroadcastLink from './publishForm-children/BroadcastLink';
import SpecificEmail from './publishForm-children/SpecificEmail';

class PublishForm extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div className="input-group vertical">
                <BroadcastLink _id={this.props._id} />
                <SpecificEmail _id={this.props._id} />
                <button onClick={this.props.close}>close</button>
            </div>
        );
    }
}

export default PublishForm;