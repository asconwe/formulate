import React, { Component } from 'react';

import axios from 'axios';

import NewElementButton from './formBuilder-children/elementContainer-children/NewElementButton'
import ElementContainer from './formBuilder-children/ElementContainer'

class FormBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            formTitle: "Your form title",
            elements: []
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.newElementInPlace = this.newElementInPlace.bind(this);
        this.editElementInPlace = this.editElementInPlace.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.index) {
            const { formTitle, elements } = this.props.getFormToEdit(this.props.match.params.index);
            this.setState({
                formTitle,
                elements
            })
        }
    }

    newElementInPlace(index, element, size) {
        console.log('size:', size);
        const newElementsArray = this.state.elements.slice(0, index)
            .concat({
                elementType: element,
                size: size,
                elementTitle: 'Prompt',
                elementPrompt: 'Subprompt'
            })
            .concat(this.state.elements.slice(index));
        this.setState({
            elements: newElementsArray
        });
    }

    editElementInPlace(index, elementContent) {
        const newElement = this.state.elements[index];
        const keys = Object.keys(elementContent);
        keys.map((key) => {
            newElement[key] = elementContent[key];
        })
        const newElementsArray = this.state.elements.slice(0, index)
            .concat(newElement)
            .concat(this.state.elements.slice(index + 1));
        this.setState({
            elements: newElementsArray
        });
    }

    handleTitleChange(event) {
        this.setState({
            formTitle: event.target.innerText
        })
    }

    handleSave(event) {
        event.preventDefault();
        const { status, target } = this.props.match.params;
        const url = `/api/${status}/${target}`;
        const formToPost = this.state;
        if (target !== 'form') {
            formToPost.refId = target;
        }
        axios.post(url, formToPost).then((response) => {
            this.props.getUserForms();
            this.props.history.push(`/form-builder/edit/${response.data.refId}/0`);
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        const whiteBackground = {
            background: "#fff"
        }
        return (
            <div className="row">
                <div style={whiteBackground} className="bordered rounded col-sm-12 col-md-10 col-md-offset-1">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 contentEditable suppressContentEditableWarning onBlur={this.handleTitleChange}>{this.state.formTitle}</h1>
                            <button onClick={this.handleSave}>Save form</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-12">
                            <ElementContainer elements={this.state.elements} newElementInPlace={this.newElementInPlace} editElementInPlace={this.editElementInPlace} />
                        </div>
                    </div>
                    <div className="row">
                        <NewElementButton index={this.state.elements.length} newElementInPlace={this.newElementInPlace} />
                    </div>
                </div>
            </div>
        );
    }
}

export default FormBuilder;