import React from 'react'

import formElementLibrary from '../formElementLibrary';

import NewElementButton from '../NewElementButton';
import CustomElementInput from './formElementContent-children/CustomElementInput'

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

class FormElementContent extends React.Component {
    constructor() {
        super();
        this.getComponent = this.getComponent.bind(this);    
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        const elementContent = {};
        elementContent[event.target.dataset.name] = event.target.textContent;
        elementContent.elementType = this.props.elementType;
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
                    <CustomElementInput type={"h2"} name="elementTitle" handleBlur={this.handleBlur} customContent={this.props.elementTitle} />
                </div>
            <CustomElementInput type={"p"} name="elementPrompt" handleBlur={this.handleBlur} customContent={this.props.elementPrompt} />
                <div className="row">
                    {this.getComponent(this.props.elementType)}
                </div>
            </div>
        );
    }
}

export default FormElementContent;