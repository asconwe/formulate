import React from 'react'

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

class FormBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            formTitle: "My form title",
            elements: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.newElementInPlace = this.newElementInPlace.bind(this);
        this.editElementInPlace = this.editElementInPlace.bind(this);
        this.handleSave = this.handleSave.bind(this);
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
        })
    }

    editElementInPlace(index, element) {
        console.log(element);
        const newElementsArray = this.state.elements.slice(0, index).concat(element).concat(this.state.elements.slice(index + 1));
        this.setState({
            elements: newElementsArray
        })
        console.log('after edit', console.log(this.state));
    }

    handlePencilClick(event) {
        if (event.target.children.length > 0) {
            event.target.children[0].focus();
        }
    }

    handleSave() {
        axios.post('/api/new/form', this.state).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
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
                                            content={data.elementContent}
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