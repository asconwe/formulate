import React, { Component } from 'react';

import formElementLibrary from '../formElementLibrary'

const optionsDivStyle = {
    float: "left",
    margin: "0 15px"
}

const optionsStyle = {
    margin: "0",
    border: "none",
    borderBottom: "solid 1px #eef",
    background: "none"
}

class OptionsButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStyle: optionsStyle
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        event.preventDefault();
        console.log(event.target.dataset);
        this.props.newElementInPlace(event.target.dataset.index, event.target.dataset.element);
        this.props.handleClose();
    }

    getFormElementNames() {
        return Object.keys(formElementLibrary);
    }

    render() {
        return (
            <div style={optionsDivStyle}>
                <div className="row">
                    <div>
                        {this.getFormElementNames().map((element, index) => {
                            return (
                                <button
                                    style={optionsStyle}
                                    className="small"
                                    onClick={this.handleSelect}
                                    data-type="options"
                                    data-index={this.props.index}
                                    data-element={element}
                                    key={index}>
                                    New {element} +
                                </button>
                            )
                        })}
                    </div>
                </div>

            </div>
        );
    }
}

export default OptionsButtons;