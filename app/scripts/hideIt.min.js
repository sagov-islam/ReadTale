import DOMWorker from './DomWorker.min.js';

export default class HideIt {

    #props;
    constructor(props) {
        this.#props = props;
        this.#props.element = DOMWorker.findElementAndReturn(props.selector);
    }

    // ---- PUBLIC ---->

    smoothHideX() {
        this.#props.element.css({
            'transition': `${this.#props.seconds}s`,
            'transform': `translate(${this.#props.px}, 0)`,
            'opacity': '0'
        });

        if (!this.#props.callback) return
        setTimeout(this.#props.callback, (this.#props.seconds * 1000));
    }

    smoothHideY() {
        this.#props.element.css({
            'transition': `${this.#props.seconds}s`,
            'transform': `translate(0, ${this.#props.px})`,
            'opacity': '0'
        });

        if (!this.#props.callback) return
        setTimeout(this.#props.callback, (this.#props.seconds * 1000));
    }
    
    // <---- PUBLIC ----

    
    // ---- STATIC ---->

    static hideY(selector, px) {
        const element = DOMWorker.findElementAndReturn(selector);

        element.css({
            'transform': `translate(0, ${px})`,
            'opacity': '0'
        });
    }

    static hideX(selector, px) {
        const element = DOMWorker.findElementAndReturn(selector);

        element.css({
            'transform': `translate(${px}, 0)`,
            'opacity': '0'
        });
    }

    // <---- STATIC ----

}