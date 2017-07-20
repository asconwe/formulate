export const getElements = () => {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
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