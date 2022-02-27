import DOMWorker from './domWorker.min.js';

export default class HideIt {

    #selector;
    #callback;
    constructor(selector, px, seconds, callback) {
        this.#selector = selector;
        this.px = px;
        this.seconds = seconds;
        this.#callback = callback;
    }

    x() {
        const element = DOMWorker.findElementAndReturn(this.#selector);
        element.css({
            'transition': `${this.seconds}s`,
            'transform': `translate(${this.px}, 0)`,
            'opacity': '0'
        });

        if (!this.#callback) return
        setTimeout(this.#callback, (this.seconds * 1000));
    }
}