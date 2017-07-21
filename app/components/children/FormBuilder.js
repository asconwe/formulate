import React from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Element from './formBuilder-children/Element';
import ElementContainer from './formBuilder-children/ElementContainer';
import formManager from './formBuilder-children/formManager';
import CustomElementInput from './formBuilder-children/CustomElementInput';
import ElementBody from './formBuilder-children/ElementBody';

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
        this.handleSave = this.handleSave.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
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
                        <div
                            draggable
                            onDragStart={(event) => (this.handleDrag(event, index))}
                            onDrag={(event) => (this.handleDrag(event, index))}
                            style={{
                                width: "3px",
                                height: '30px',
                                float: 'right',
                                marginRight: '32px',
                                fontSize: "1.3em",
                                cursor: 'ew-resize'
                            }}>⇔</div>
                        <h3 style={{ marginBottom: "0px" }}>
                            <CustomElementInput
                                value={element.elementTitle}
                                index={index}
                                contentKey="elementTitle"
                                editElement={this.editElementInPlace}
                            />
                        </h3>
                        <p style={{ marginTop: "0px" }}>
                            <CustomElementInput
                                value={element.elementPrompt}
                                index={index}
                                contentKey="elementPrompt"
                                editElement={this.editElementInPlace}
                            />
                        </p>
                        <ElementBody type={element.elementType} />
                    </div>
                </Element>
            )
        };
        return (
            <div className={`col-sm-12 col-md-${element.size}`} key={index}>
                <ElementContainer
                    index={index}
                    dragObj={this.state.dragObj}
                    setElementArr={this.setElementArr}>
                    {getCurrentElement()}
                </ElementContainer>
                <h5 style={{ float: 'right', cursor: 'pointer', marginTop: '3px' }}>Edit</h5>
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

    handleDrag(event, index) {
        event.stopPropagation();
        const oneTwelfth = window.innerWidth * 10 / 12 / 12;
        console.log(index);
        const currentSize = parseInt(this.state.elements[index].size, 10);
        if (event.type === "drag") {
            const difference = event.pageX - this.state.dragStart;
            // Ignore last event, returning pageX to 0 after mouse release
            if (event.pageX !== 0) {
                /* 
                ** If the drag distance is larger than 1/12 of the work area,
                ** then increase or decrease the number of columns that form element takes up
                ** and reset the distance to 0 for the next interval
                */
                if (Math.abs(difference) > oneTwelfth) {
                    if (difference > 0) {
                        const largerSize = currentSize + 1;
                        this.handleSizeChange(largerSize.toString(), index)
                        return this.setState({
                            dragStart: event.pageX
                        })
                    } else if (difference < 0) {
                        const smallerSize = currentSize - 1;
                        this.handleSizeChange(smallerSize.toString(), index);
                        return this.setState({
                            dragStart: event.pageX
                        })
                    }
                }
            }
        } else if (event.type === "dragstart") {
            return this.setState({ dragStart: event.pageX });
        }
    }

    handleSizeChange(size, index) {
        console.log(size, index);
        const elementContent = Object.assign({}, { size: size });
        this.editElementInPlace(index, elementContent);
    }

    editElementInPlace(index, elementContent) {
        const newElement = this.state.elements[index];
        const keys = Object.keys(elementContent);
        keys.map((key) => {
            newElement[key] = elementContent[key];
        })
        const newElementsArray = this.state.elements.slice(0, index)
            .concat(newElement)
            .concat(this.state.elements.slice(index + 1));
        this.setState({
            elements: newElementsArray
        });
    }

    newElement() {
        this.newElementInPlace(this.state.elements.length, 'textarea', 6);
    }

    handleSave(event) {
        event.preventDefault();
        const { status, target } = this.props.match.params;
        const url = `/api/${status}/${target}`;
        const formToPost = this.state;
        if (target !== 'form') {
            formToPost.refId = target;
        }
        axios.post(url, formToPost).then((response) => {
            this.props.getUserForms();
            this.props.history.push(`/form-builder/edit/${response.data.refId}/0`);
        }).catch((error) => {
            console.log(error)
        });
    }

    handleTitleChange(a, content) {
        this.setState(content)
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
                                <h1><CustomElementInput
                                    value={this.state.formTitle}
                                    index={0}
                                    contentKey="formTitle"
                                    editElement={this.handleTitleChange}
                                /></h1>
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