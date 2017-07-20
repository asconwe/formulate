import React from 'react'

const smallTextStyle = {
    minHeight: "50px"
}

class InputTextElement extends React.Component {
    render() {
        return (
            <div className="col-sm-12 bordered" style={smallTextStyle} name={this.props.props.name}></div>
        )
    }
}

export default InputTextElement