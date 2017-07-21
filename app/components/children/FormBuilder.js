import React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Element from './formBuilder-children/Element';
import ElementContainer from './formBuilder-children/ElementContainer';
import formManager from './formBuilder-children/formManager';
import CustomElementInput from './formBuilder-children/CustomElementInput'

class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            ready: false
        };
        this.renderElementContainer = this.renderElementContainer.bind(this);
        this.setElementArr = this.setElementArr.bind(this);
        this.setDragObj = this.setDragObj.bind(this);
        this.newElement = this.newElement.bind(this);
        this.newElementInPlace = this.newElementInPlace.bind(this);
        this.newElement = this.newElement.bind(this);
        this.editElementInPlace = this.editElementInPlace.bind(this);
    }

    componentDidMount() {
        formManager.getElements(this.props, (obj) => this.setState(obj));
    }

    setDragObj(obj) {
        this.setState({
            dragObj: obj
        });
    }

    setElementArr(arr) {
        this.setState({
            elements: arr
        }, () => {
            console.log(this.state);
        });
    }

    renderElementContainer(element, index) {
        const getCurrentElement = () => {
            return (
                <Element
                    content={element}
                    elements={this.state.elements}
                    index={index}
                    setDragObj={this.setDragObj}>
                    <div>
                        <h3>
                            <CustomElementInput
                                value={element.elementTitle}
                                index={index}
                                contentKey="elementTitle"
                                editElement={this.editElementInPlace}
                            />
                        </h3>
                        <p>
                            <CustomElementInput
                                value={element.elementPrompt}
                                index={index}
                                contentKey="elementPrompt"
                                editElement={this.editElementInPlace}
                            />
                        </p>
                        <h5 style={{float: 'right', cursor: 'pointer'}}>Edit</h5>
                    </div>
                </Element>
            )
        };
        return (
            <div className="col-sm-12 col-md-6" key={index}>
                <ElementContainer
                    index={index}
                    dragObj={this.state.dragObj}
                    setElementArr={this.setElementArr}>
                    {getCurrentElement()}
                </ElementContainer>
            </div>
        );
    }

    newElementInPlace(index, element, size) {
        console.log('size:', size);
        const newElementsArray = this.state.elements.slice(0, index)
            .concat({
                elementType: element,
                size: size,
                elementTitle: 'Prompt',
                elementPrompt: 'Subprompt'
            })
            .concat(this.state.elements.slice(index));
        this.setState({
            elements: newElementsArray
        });
    }

    editElementInPlace(index, elementContent) {
        const newElement = this.state.elements[index];
        const keys = Object.keys(elementContent);
        console.log(keys);
        keys.map((key) => {
            newElement[key] = elementContent[key];
        })
        const newElementsArray = this.state.elements.slice(0, index)
            .concat(newElement)
            .concat(this.state.elements.slice(index + 1));
        this.setState({
            elements: newElementsArray
        }, () => console.log(this.state));
    }

    newElement() {
        this.newElementInPlace(this.state.elements.length, 'textarea', 6);
    }

    render() {
        const whiteBackground = {
            background: "#fff"
        }
        return (
            <div className="container">
                <div className="row">
                    <div style={whiteBackground} className="col-sm-12 col-md-10 col-md-offset-1">
                        <div className="row">
                            <div className="col-sm-12">
                                <button style={{ float: 'right', marginTop: '15px' }} onClick={this.handleSave}>Save form</button>
                                <h1 contentEditable suppressContentEditableWarning onBlur={this.handleTitleChange}>{this.state.formTitle}</h1>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                {this.state.elements.length > 0 ? this.state.elements.map(this.renderElementContainer) : <div />}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h2 style={{ cursor: 'pointer' }} onClick={this.newElement}>+</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(FormBuilder);