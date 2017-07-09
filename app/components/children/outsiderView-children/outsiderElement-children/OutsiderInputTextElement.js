import React from 'react'

class OutsiderInputTExtElement extends React.Component {
    constructor() {
        super();
    }

    onChange() {
        this.props.props.setResponse()
    }

    render() {
        return (
            <input type="text" name={this.props.props.form.name} />
        )
    }
}

export default OutsiderInputTExtElement