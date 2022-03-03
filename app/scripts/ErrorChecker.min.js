export default class ErrorChecker {
    // STATIC ---->
    static domElement(element) {
        if (!element)
            throw new ReferenceError(`You have to add element in the method`);
        if (element.length === 0)
            throw new ReferenceError(`element '${containerSelector}' not found`);
    }
    // <---- STATIC
}