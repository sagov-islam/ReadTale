import DOMWorker from "./domWorker.min.js";

export default class ShowIt {

    #props
    constructor(props) {
        this.#props = props;
        this.#props.element = DOMWorker.findElementAndReturn(props.selector);
    }

    // ---- PUBLIC ---->

    smoothShow() {
        this.#props.element.css({
            'transition': `${this.#props.seconds}s`,
            'transform': `translate(0, 0)`,
            'opacity': '1'
        });

        if (!this.#props.callback) return
        setTimeout(this.#props.callback, (this.#props.seconds * 1000));

    }
    
    // <---- PUBLIC ----
}