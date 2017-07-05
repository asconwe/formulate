import React from 'react'

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

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-md-offset-1">
                        <h1>FormBuilder</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-md-offset-1 bordered rounded" style={whiteBackground}>
                        <div>
                            <h1><input style={titleInput} type="text" name="form-title" onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.formTitle} /></h1>
                            <form style={formBody}>
                                {console.log(this.state.elements)}
                                {this.state.elements.map((data, index) => {
                                    console.log('here', index);
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