import React, { Component } from 'react';

import FormElement from './formBuilder-children/FormElement'

class FormBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            formTitle: "Your form title",
            elements: []
        }
        // this.handleChange = this.handleChange.bind(this);
        this.newElementInPlace = this.newElementInPlace.bind(this);
        this.editElementInPlace = this.editElementInPlace.bind(this);
        // this.handleSave = this.handleSave.bind(this);
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

    newElementInPlace(index, element) {
        const newElementsArray = this.state.elements.slice(0, index)
            .concat({ elementType: element })
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
        console.log('after edit', console.log(this.state));
    }

    handleTitleChange(event) {
        this.setState({
            formTitle: event.target.value
        })
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
                            <h1 contentEditable onChange={this.handleTitleChange}>{this.state.formTitle}</h1>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <FormElement size="6" />
                                <FormElement size="6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormBuilder;