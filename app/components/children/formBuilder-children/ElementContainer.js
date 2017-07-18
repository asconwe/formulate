import React, { Component } from 'react';

import FormElement from './elementContainer-children/FormElement';

class ElementContainer extends Component {
    render() {
        return (
            <div className="row">
                {this.props.elements.map((data, index) => {
                    console.log(data.size);
                    return (
                        <FormElement
                            elementType={data.elementType}
                            size={data.size}
                            index={index}
                            newElementInPlace={this.props.newElementInPlace}
                            editElementInPlace={this.props.editElementInPlace}
                            elementTitle={data.elementTitle}
                            elementPrompt={data.elementPrompt}
                            key={index}
                        />
                    )
                })}
            </div>
        );
    }
}

export default ElementContainer;