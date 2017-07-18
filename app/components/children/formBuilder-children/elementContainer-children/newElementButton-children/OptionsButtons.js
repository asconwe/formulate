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
        const { index, element, size } = event.target.dataset
        console.log(index, element, size)
        this.props.newElementInPlace(index, element, size);
        this.props.handleClose();
    }

    getFormElements() {
        return Object.values(formElementLibrary)
    }

    render() {
        return (
            <div style={optionsDivStyle}>
                <div className="row">
                    <div>
                        {this.getFormElements().map((element, index) => {
                            return (
                                <button
                                    style={optionsStyle}
                                    className="small"
                                    onClick={this.handleSelect}
                                    data-type="options"
                                    data-index={this.props.index}
                                    data-element={element.name}
                                    data-size={element.size}
                                    key={index}>
                                    New {element.nickName} +
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