import React from 'react';

import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';
import { removeElement } from './formManager';

const elementSource = {
    beginDrag(props) {
        const obj = removeElement(props.elements, props.index);
        props.setDragObj(obj);
        return {elementId: props.index}
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Element extends React.Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={{background: 'white'}}>
              {this.props.content}
            </div>
        );
    }
}

export default DragSource(ItemTypes.ELEMENT, elementSource, collect)(Element);