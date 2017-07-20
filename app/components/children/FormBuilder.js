import React from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Element from './formBuilder-children/Element';
import ElementContainer from './formBuilder-children/ElementContainer';
import formManager from './formBuilder-children/formManager';

class FormBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            elements: formManager.getElements()
        };
        this.renderElementContainer = this.renderElementContainer.bind(this);
        this.setElementArr = this.setElementArr.bind(this);
        this.setDragObj = this.setDragObj.bind(this);
    }
    
    handleContainerClick(from, to) {
        const obj = formManager.removeElement(this.state.elements, from);
        const newElements = formManager.insertElement(obj, to);
        this.setState({
            elements: newElements
        });
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
            return <Element content={element} elements={this.state.elements} index={index} setDragObj={this.setDragObj}/>
        };
        return (
            <div key={index}
                onClick={() => this.handleContainerClick(0, index)}>
                <ElementContainer 
                    index={index}
                    dragObj={this.state.dragObj}
                    setElementArr={this.setElementArr}>
                    {getCurrentElement()}  
                </ElementContainer>
            </div>
        );
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        {this.state.elements.map(this.renderElementContainer)}
                    </div>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(FormBuilder);