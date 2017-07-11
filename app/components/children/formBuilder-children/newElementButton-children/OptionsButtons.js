import React, { Component } from 'react';

import formElementLibrary from '../formElementLibrary'

class OptionsButtons extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        event.preventDefault();
        console.log(event.target.dataset);
        this.props.newElementInPlace(event.target.dataset.index, event.target.dataset.element);
    }

    getFormElementNames() {
        return Object.keys(formElementLibrary);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <span style={{ lineHeight: "30px" }}>+</span>
                    <div className="col-sm-11 col-md-9">
                        <span className="button-group">
                            {this.getFormElementNames().map((element, index) => {
                                return <button onClick={this.handleSelect} data-type="options" data-index={this.props.index} data-element={element} key={index}>New {element} +</button>
                            })}
                        </span>
                    </div>
                </div>

            </div>
        );
    }
}

export default OptionsButtons;