import React from 'react'

const textareaSytle = {
    marginRight: "5px",
    marginLeft: "5px",
    display: "block",
    clear: "both",
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    boxSizing: "border-box",
    width: "100%"
}

class OutsiderTextAreaElement extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        const thisResponse = event.target.value;
        const index = this.props.props.index;
        console.log(index);
        this.props.props.setResponse(index, thisResponse);
    }

    render() {
        return (
            <textarea onChange={this.handleChange} className="col-xs-12" style={textareaSytle} name={this.props.props.form.name} cols="30" rows="10"></textarea>
        )
    }
}

export default OutsiderTextAreaElement