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

}

class FormBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            formTitle: "My form title",
            elements: [{ elementType: 'textarea' }]
        }
        this.handleChange = this.handleChange.bind(this);
        this.newElementInPlace = this.newElementInPlace.bind(this);
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
        console.log('this.state.elements', this.state.elements);
        const newElementsArray = this.state.elements.slice(0, index).concat({ elementType: element }).concat(this.state.elements.slice(index));
        console.log('newElementsArray', newElementsArray)
        this.setState({
            elements: newElementsArray
        })
    }

    handlePencilClick(event) {
        console.log(event.target.children[0]);
        event.target.children[0].focus();
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
                                    return <FormElement elementType={data.elementType} index={index} newElementInPlace={this.newElementInPlace} content={data.elementContent} key={index} />
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