import React from 'react'

const textareaSytle = {
    

}

class TextAreaElement extends React.Component {

    render() {
        return (
            <textarea className="col-sm-12" style={textareaSytle} name={this.props.props.name} cols="30" rows="10"></textarea>
        )
    }
}

export default TextAreaElement