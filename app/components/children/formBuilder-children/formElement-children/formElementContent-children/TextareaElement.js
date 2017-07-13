import React from 'react'

const textareaSytle = {
    minHeight: "60px"

}

class TextAreaElement extends React.Component {

    render() {
        return (
            <div className="col-sm-12 bordered" style={textareaSytle} name={this.props.props.name} rows="10"></div>
        )
    }
}

export default TextAreaElement