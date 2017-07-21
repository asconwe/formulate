export const getElements = (props, callback) => {
    if (props.match.params.index) {
        const { formTitle, elements } = props.getFormToEdit(this.props.match.params.index);
        const returnObj = { formTitle, ready: true };
        if (elements.length > 0) returnObj.elements = elements;
        console.log(returnObj);
        return callback(returnObj);
    }
    return callback({ formTitle: 'Your form title' });
};

export const removeElement = (elements, fromPosition) => {
    const toMove = elements[fromPosition];
    const newArr = elements.slice(0, fromPosition).concat(elements.slice(fromPosition + 1));
    return { elements: newArr, singleElement: toMove };
};

export const insertElement = ({ elements, singleElement }, toPosition) => {
    return elements.slice(0, toPosition).concat(singleElement).concat(elements.slice(toPosition));
};

const formManager = {
    getElements,
    removeElement,
    insertElement,
};

export default formManager;