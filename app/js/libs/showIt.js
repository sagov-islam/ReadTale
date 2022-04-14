'use strict';

import { visible } from './variables.min.js';

export default class ShowIt {

    #props
    constructor(props) {
        this.#props = props;
        this.#props.element = $(props.selector, props.context ? props.context : '');
    }

    // ---- PUBLIC ---->

    smoothShow() {
        const show = {...visible};
        const seconds = this.#props.seconds;
        const element = this.#props.element;

        show.transition =`${seconds}s`;
        $(element).css(show);

        if (!this.#props.callback) return
        setTimeout(this.#props.callback, (this.#props.seconds * 1000));
    }

    static smoothShowSlicedElements(elementsSelector, indexes, seconds) {
        const cards = $(elementsSelector);
        let start = indexes.start;
        let end = indexes.end;

        const interval = setInterval(() => {
            if (start === end) clearInterval(interval);

            const show = {...visible};
            show.transition =`${seconds}s`;
            $(cards[start]).css(show);

            start++;
        }, 100)
    }
    
    // <---- PUBLIC ----
}