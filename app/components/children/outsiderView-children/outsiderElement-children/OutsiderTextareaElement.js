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

    render() {
        return (
            <textarea className="col-xs-12" style={textareaSytle} name={this.props.props.name} cols="30" rows="10"></textarea>
        )
    }
}

export default OutsiderTextAreaElement