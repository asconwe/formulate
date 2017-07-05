import React from 'react'

import formElementLibrary from './formElementLibrary'

class NewElementButton extends React.Component {
    constructor() {
        super()

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        console.log(event.target.dataset.index);
        this.props.newElementInPlace(event.target.dataset.index, event.target.dataset.element);
    }

    getFormElementNames() {
        return Object.keys(formElementLibrary);
    }

    render() {
        return (
            <div className="col-xs-12">
                <p>new element:</p>
                <div className="button-group">
                    {this.getFormElementNames().map((element, index) => {
                        return <button onClick={this.handleSelect} data-type="options" data-index={this.props.index} data-element={element} key={index}>{element} +</button>
                    })}
                </div>
            </div>
        )
    }
}

export default NewElementButton