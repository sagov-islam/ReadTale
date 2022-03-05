import ErrorChecker from "./ErrorChecker.min.js";

export default class DOMWorker {

    // STATIC ---->
    static findElementAndReturn(selector, context) {
        const elementsList = $(selector, context ? context : '');

        if (elementsList.length !== 0) return elementsList;
        throw new ReferenceError(`element ${selector} is not defined`);
    }

    static addElement(containerSelector, element) {
        const container = containerSelector ? $(`${containerSelector}`) : undefined;

        ErrorChecker.domElement(container);
        ErrorChecker.domElement(element);

        container.html(element);
    }

    static prepend(containerSelector, element) {
        const container = containerSelector ? $(`${containerSelector}`).first() : undefined;

        ErrorChecker.domElement(container);
        ErrorChecker.domElement(element);

        container.prepend(element);
    }
    // <---- STATIC
}

