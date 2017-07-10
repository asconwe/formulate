import React from 'react';
class SectionPrompt extends React.Component {
    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleBlur(event) {
        this.props.handleBlur(event);
    }
    
    handleFocus(event) {
        event.target.select();
    }

    render() {
        const style = {
            resize: "none",
            width: "100%",
            background: "inherit",
            fontFamily: "inherit",
            fontSize: "inherit",
            overflow: "hidden",
            padding: 0,
            border: "none"
        };
        return (
            <span>
                <textarea style={style} className="col-sm-12 col-md-4 col-lg-3" data-name={this.props.name} onFocus={this.handleFocus} onBlur={this.handleBlur}>{this.props.customContent}</textarea>
            </span>
        );
    }
}

export default SectionPrompt;