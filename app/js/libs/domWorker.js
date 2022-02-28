export default class DOMWorker {

    // ---- STATIC ---->
    static findElementAndReturn(selector, context) {
        const elementsList = $(selector, context ? context : '');

        if (elementsList.length !== 0) return elementsList;
        throw new ReferenceError(`element ${selector} is not defined`);
    }

    static addElement(containerSelector, element) {
        const container = containerSelector ? $(`${containerSelector}`) : undefined;

        if (!container)
            throw new ReferenceError(`you have to add container for the element in the addElement()`);
        if (container.length === 0)
            throw new ReferenceError(`container '${containerSelector}' not found`);
        if (!element)
            throw new ReferenceError(`you have to add element in the addElement()`);
        
        container.html(element);
    }
    // <---- STATIC ----
}

