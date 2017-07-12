import React, { Component } from 'react';

class FormBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            formTitle: startingTitle,
            elements: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.newElementInPlace = this.newElementInPlace.bind(this);
        this.editElementInPlace = this.editElementInPlace.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.index) {
            const { formTitle, elements } = this.props.getFormToEdit(this.props.match.params.index);
            this.setState({
                formTitle,
                elements
            })
        }
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default FormBuilder;