import React from 'react'

import formElementLibrary from './formElementLibrary';

import NewElementButton from './NewElementButton';
import CustomElementInput from './formElement-children/CustomElementInput';

const input = {
    background: 'white',
    fontSize: '1em',
    fontWeidth: 'normal',
    paddingLeft: '10px',
    border: 'none',
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    boxSizing: "border-box"
}

class FormElement extends React.Component {
    constructor() {
        super();
        this.getComponent = this.getComponent.bind(this);    
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        console.log(event, 'here', event.target.textContent);
        const elementContent = {};
        elementContent[event.target.dataset.name] = event.target.value;
        elementContent.elementType = this.props.elementType;
        console.log('element content', elementContent);
        this.props.editElementInPlace(this.props.index, elementContent);
    }

    handlePencilClick(event) {
        if (event.target.children.length > 0) {
            event.target.children[0].focus();
        }
    }

    getComponent(elementType) {
        return formElementLibrary[elementType].getter(this.props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <NewElementButton index={this.props.index} newElementInPlace={this.props.newElementInPlace} />
                </div>
                <div>
                    <h3><CustomElementInput name="elementTitle" handleBlur={this.handleBlur} customContent={this.props.elementTitle}/></h3>
                </div>
                    <p><CustomElementInput name="elementPrompt" handleBlur={this.handleBlur} customContent={this.props.elementPrompt}/></p>
                    <div className="row">
                    {console.log('elementType in FormElement', this.props.elementType)}
                    {console.log('props in FormElement', this.props)}
                    {this.getComponent(this.props.elementType)}
                </div>
            </div>
        )
    }
}

export default FormElement