import React from 'react';

import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { insertElement } from './formManager';


const elementTarget = {
    drop(props, monitor) {
        const arr = insertElement(props.dragObj, props.index);
        props.setElementArr(arr);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class ElementContainer extends React.Component {
    render() {
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(
            <div style={{ background: isOver ? '#fcfcff' : 'none' }} className="bordered">
                {this.props.children}
            </div>
        );
    }
}

export default DropTarget(ItemTypes.ELEMENT, elementTarget, collect)(ElementContainer);