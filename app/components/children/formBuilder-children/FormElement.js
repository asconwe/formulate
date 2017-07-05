import React from 'react'

import formElementLibrary from './formElementLibrary'

import NewElementButton from './NewElementButton'

class FormElement extends React.Component {
    constructor() {
        super();
        this.state = {

        }
        this.getComponent = this.getComponent.bind(this);
    }

    handleClick() {
        console.log(click);
    }

    getComponent(elementType) {
        console.log(elementType);
        return formElementLibrary[elementType].getter(this.props)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <NewElementButton index={this.props.index} newElementInPlace={this.props.newElementInPlace}/>
                </div>
                <div className="row">
                    {this.getComponent(this.props.elementType)}
                </div>
            </div>
        )
    }
}

export default FormElement