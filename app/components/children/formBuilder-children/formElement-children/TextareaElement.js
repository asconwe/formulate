import React from 'react'

const textareaSytle = {
    

}

class TextAreaElement extends React.Component {

    render() {
        return (
            <textarea className="col-sm-12" style={textareaSytle} disabled name={this.props.props.name} rows="10"></textarea>
        )
    }
}

export default TextAreaElement