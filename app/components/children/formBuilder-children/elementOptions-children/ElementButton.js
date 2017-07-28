import React, { Component } from 'react';

import formElementLibrary from '../formElementLibrary';

class ElementButton extends Component {
    render() {
        return (
            <div>
                {Object.values(formElementLibrary).map((element, index) => (
                    <button
                        style={{ background: 'white' }}
                        onClick={() => this.props.handleChoice(element.name)}
                    >
                        {element.nickName}
                    </button>
                ))}
            </div>
        );
    }
}

export default ElementButton;


