import React, { Component } from 'react';

import CustomElementInput from './CustomElementInput';
import ElementButton from './elementOptions-children/ElementButton';
import IsRequired from './elementOptions-children/IsRequired';
import Done from './elementOptions-children/Done';
import formElementLibrary from './formElementLibrary';

const modalStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    paddingTop: '100px'
}

class ElementOptions extends Component {
    constructor() {
        super();
        this.state = {
            stage: 0,
        };
        this.handleChoice = this.handleChoice.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.editPrompt = this.editPrompt.bind(this);
    }

    handleChoice(name) {
        this.setState({
            name: name
        })
    }

    editTitle(title) {
        this.setState({
            title
        })
    }
    
    editPrompt(prompt) {
        this.setState({
            prompt
        })
    }

    renderContent() {
        const contentArr = [
            <ElementButton handleChoice={this.handleChoice} />,
            <h3>
                <CustomElementInput
                    value={this.props.elementTitle}
                    index={this.props.index}
                    contentKey="elementTitle"
                    editElement={this.editTitle}
                />
            </h3>,
            <p>
                <CustomElementInput
                    value={this.props.elementPrompt}
                    index={this.props.index}
                    contentKey="elementPrompt"
                    editElement={this.editPrompt}
                />
            </p>,
            <Done />
        ]

        const previous = () => {
            const stage = this.state.stage - 1;
            this.setState({stage})
        }
    
        const next = () => {
            const stage = this.state.stage + 1;
            this.setState({stage})
        }

        const finish = (event) => {
            console.log('in finish funciton')
            const { name, title, prompt } = this.state;
            this.props.newElementInPlace(this.props.index, name, formElementLibrary[name].size, title, prompt);
            this.props.close();
        }

        return (
            <div>
                {contentArr[this.state.stage]}
                {this.state.stage > 0 ? <button onClick={previous}>Previous</button> : <span />}
                {this.state.stage < contentArr.length - 1 ? <button onClick={next}>Next</button> : <button onClick={finish}>Add to form!</button>}
            </div>
        )
    }

    render() {
        return (
            <div style={modalStyle} onClick={this.props.closeOptions}>
                <div style={{ position: 'relative' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2 bordered rounded" style={{ background: 'white', paddingBottom: '50px' }}>
                                {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ElementOptions;