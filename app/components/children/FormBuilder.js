import React from 'react'

import { Router, Redirect } from 'react-router'

import axios from 'axios'

import FormElement from './formBuilder-children/FormElement'
import NewElementButton from './formBuilder-children/NewElementButton'

const titleInput = {
    background: 'white',
    fontSize: '1em',
    fontWeidth: 'normal',
    paddingLeft: '10px',
    border: 'none'
}

const whiteBackground = {
    background: 'white'
}

const formBody = {
    background: 'white'
}

const startingTitle = "My Form Title"

class FormBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            formTitle: startingTitle,
            elements: []
        }
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        this.setState({
            formTitle: event.target.value
        })
    }

    handleFocus(event) {
        event.target.select();
    }

    newElementInPlace(index, element) {
        const newElementsArray = this.state.elements.slice(0, index).concat({ elementType: element }).concat(this.state.elements.slice(index));
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
        const newElementsArray = this.state.elements.slice(0, index).concat(newElement).concat(this.state.elements.slice(index + 1));
        this.setState({
            elements: newElementsArray
        });
        console.log('after edit', console.log(this.state));
    }

    handlePencilClick(event) {
        if (event.target.children.length > 0) {
            event.target.children[0].focus();
        }
    }

    handleSave(event) {
        event.preventDefault();
        const { status, target } = this.props.match.params;
        const url = `/api/${status}/${target}`;
        const formToPost = this.state;
        console.log(target !== 'form');
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
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-md-offset-1">
                        <h1>FormBuilder</h1>
                        <button onClick={this.handleSave} >Save form</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-md-offset-1 bordered rounded" style={whiteBackground}>
                        <div>
                            <h1 onClick={this.handlePencilClick} >&#x270e;<input style={titleInput} type="text" name="form-title" onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.formTitle} /></h1>
                            <form style={formBody}>
                                {this.state.elements.map((data, index) => {
                                    {console.log(data.elementType)}    
                                    return (
                                        <FormElement
                                            elementType={data.elementType}
                                            index={index}
                                            newElementInPlace={this.newElementInPlace}
                                            editElementInPlace={this.editElementInPlace}
                                            elementTitle={data.elementTitle}
                                            elementPrompt={data.elementPrompt}
                                            key={index}
                                        />
                                    )
                                })}
                                <div className="row">
                                    <NewElementButton index={this.state.elements.length} newElementInPlace={this.newElementInPlace} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormBuilder