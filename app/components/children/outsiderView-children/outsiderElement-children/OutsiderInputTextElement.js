import React from 'react'

class OutsiderInputTExtElement extends React.Component {
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
            <input onChange={this.handleChange} type="text" name={this.props.props.form.name} value={this.props.props.response}/>
        )
    }
}

export default OutsiderInputTExtElement