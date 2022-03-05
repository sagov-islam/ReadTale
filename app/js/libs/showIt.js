import DOMWorker from "./DomWorker.min.js";
import { visible } from './variables.min.js';

export default class ShowIt {

    #props
    constructor(props) {
        this.#props = props;
        this.#props.element = DOMWorker.findElementAndReturn(props.selector);
    }

    // ---- PUBLIC ---->

    smoothShow() {
        const show = {...visible}
        show.transition =`${this.#props.seconds}s`;

        this.#props.element.css(show);

        if (!this.#props.callback) return
        setTimeout(this.#props.callback, (this.#props.seconds * 1000));

    }
    
    // <---- PUBLIC ----
}