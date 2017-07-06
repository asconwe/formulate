import React from 'react'

import formElementLibrary from './formElementLibrary'

import NewElementButton from './NewElementButton'

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
        this.state = {

        }
        this.getComponent = this.getComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const elementContent = {};
        elementContent[event.target.name] = event.target.value;
        elementContent.elementType = this.props.elementType;
        console.log(elementContent);
        this.props.editElementInPlace(this.props.index, elementContent);
    }

    handlePencilClick(event) {
        if (event.target.children.length > 0) {
            event.target.children[0].focus();
        }
    }

    handleFocus(event) {
        event.target.select();
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
                    <h3 onClick={this.handlePencilClick}>&#x270e;<input style={input} type="text" name="elementTitle" onFocus={this.handleFocus} onChange={this.handleChange} value={this.props.elementTitle} /></h3>
                </div>
                    <p onClick={this.handlePencilClick}>&#x270e;<textarea style={input} type="text" name="elementPrompt" onFocus={this.handleFocus} onChange={this.handleChange} value={this.props.elementPrompt} /></p>
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