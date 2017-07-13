import React from 'react';
class SectionPrompt extends React.Component {
    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleBlur(event) {
        this.props.handleBlur(event);
    }

    render() {
        const style = {
            display: "inherit",
            width: "100%",
            background: "inherit",
            fontFamily: "inherit",
            fontSize: "inherit",
            padding: 0,
            border: "none",
            overflow: "hidden",
            resize: "none",
        };
        return (
            <span style={style}>
                <span contentEditable="true" style={style} className="col-sm-12 col-md-4 col-lg-3" data-name={this.props.name} onFocus={this.handleFocus} onBlur={this.handleBlur}>{this.props.customContent}</span>
            </span>
        );
    }
}

export default SectionPrompt;