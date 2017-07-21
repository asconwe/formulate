import React from 'react';

class SectionPrompt extends React.Component {
    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        console.log('=============', event.target.dataset)
        const content = { [event.target.dataset.contentkey]: event.target.textContent }
        console.log(content);
        this.props.editElement(this.props.index, content);
    }

    render() {
        const inherit = {
            fontSize: 'inherit',
        }
        return (
            <span contentEditable suppressContentEditableWarning style={inherit} data-contentKey={this.props.contentKey} onBlur={this.handleBlur}>
                {console.log(this.props.value)}
                {this.props.value}
            </span>
        );
    }
}

export default SectionPrompt;