import React from 'react'

const textareaSytle = {
    minHeight: "50px"

}

class TextAreaElement extends React.Component {
    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleBlur(event) {
        if (this.props.props.editable) {
            const data = event.target.textContent;
            this.props.props.setResponse(data);
        }
    }
    
    render() {
        return (
            <div 
                contentEditable={this.props.props.editable || false} 
                onBlur={this.handleBlur}
                className="col-sm-12 bordered" 
                style={textareaSytle} 
                name={this.props.props.name}>
            </div>
        );
    }
}

export default TextAreaElement;