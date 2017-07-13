import React from 'react'

import outsiderElementLibrary from './outsiderElementLibrary'

const input = {
    background: 'white',
    fontSize: '1em',
    fontWeidth: 'normal',
    paddingLeft: '10px',
    border: 'none',
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    boxSizing: "border-box"
}

class OutsiderElement extends React.Component {
    constructor() {
        super();
        this.getComponent = this.getComponent.bind(this);
    }

    getComponent(elementType) {
        console.log(elementType);
        return outsiderElementLibrary[elementType].getter(this.props);
    }

    render() {
        return (
            <div className={`col-sm-12 col-md-${this.props.form.size}`}>
                <div>
                    <h3>{this.props.form.elementTitle}</h3>
                </div>
                <p>{this.props.form.elementPrompt}</p>
                <div className="row">
                    {this.getComponent(this.props.form.elementType)}
                </div>
            </div>
        )
    }
}

export default OutsiderElement;