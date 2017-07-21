import React from 'react';

class OutsiderElement extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={`col-sm-12 col-md-${this.props.form.size}`}>
                <h3>{this.props.form.elementTitle}</h3>
                <p>{this.props.form.elementPrompt}</p>
                <div className="row">
                    <div className="col-sm-12">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default OutsiderElement;