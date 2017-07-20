import React from 'react';

class SectionPrompt extends React.Component {
    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        this.props.handleBlur(event);
    }

    getTypeInput(type) {
        const types = {
            h2: (<h2
                contentEditable="true"
                suppressContentEditableWarning
                className="col-sm-12"
                data-name={this.props.name}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}>
                {this.props.customContent}
            </h2>),
            p: (<p
                contentEditable="true"
                suppressContentEditableWarning
                className="col-sm-12"
                data-name={this.props.name}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}>
                {this.props.customContent}
            </p>)
        }
        return types[type];
    }

    render() {
        return (
            <span>
                {this.getTypeInput(this.props.type)}
            </span>
        );
    }
}

export default SectionPrompt;