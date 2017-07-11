import React from 'react'

class InputTextElement extends React.Component {
    render() {
        return (
            <input name={this.props.props.name} disabled type="text" />
        )
    }
}

export default InputTextElement