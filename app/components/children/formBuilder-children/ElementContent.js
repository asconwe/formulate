import React, { Component } from 'react';

import CustomElementInput from './CustomElementInput'

class ElementContent extends Component {
    render() {
        return (
            <div>
                <h3>
                    <CustomElementInput
                        value={this.props.elementTitle}
                        index={this.props.index}
                        contentKey="elementTitle"
                        editElement={this.props.editElement}
                    />
                </h3>
                <p>
                    <CustomElementInput
                        value={this.props.elementPrompt}
                        index={this.props.index}
                        contentKey="elementPrompt"
                        editElement={this.props.editElement}
                    />
                </p>
            </div>
        );
    }
}

export default ElementContent;
