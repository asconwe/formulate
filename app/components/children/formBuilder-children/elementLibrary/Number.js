import React from 'react'

const textareaSytle = {
    minHeight: "50px"

}

class NumberElement extends React.Component {
    constructor() {
        super();
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleBlur(event) {
        if (this.props.props.editable) {
            if (!isNaN(event.target.textContent)) {
                const data = event.target.textContent;
                return this.props.props.setResponse(data);
            }
            // return this.validate()
        }
    }
    
    render() {
        return (
            <div 
                contentEditable={this.props.props.editable || false} 
                onBlur={this.handleBlur}
                className="col-sm-12 bordered" 
                style={textareaSytle} 
                name={this.props.props.name}>{this.props.props.value}
            </div>
        );
    }
}

export default NumberElement;