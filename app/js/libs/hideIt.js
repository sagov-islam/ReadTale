import DOMWorker from './DomWorker.min.js';
import { visible, invisible } from './variables.min.js';

export default class HideIt {

    #props;
    constructor(props) {
        this.#props = props;
        this.#props.element = DOMWorker.findElementAndReturn(props.selector);
    }

    // PUBLIC ---->
    
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
        const hide = {...invisible};
        hide.transition = `${this.#props.seconds}s`;
        hide.transform = `translate(0, ${this.#props.px})`;
        
        this.#props.element.css(invisible);

        if (!this.#props.callback) return
        setTimeout(this.#props.callback, (this.#props.seconds * 1000));
    }
    
    // <---- PUBLIC 

}