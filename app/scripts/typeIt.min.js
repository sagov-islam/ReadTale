import DOMWorker from './DomWorker.min.js';

export default class TypeIt {

    #letter = 0;
    #line = 0;
    #result = '';
    #props;

    constructor(props) {
        this.#props = props;
    }

    startTyping() {
        this.#timeOut(this.#props.interval, this.#line, this.#letter)
    }

    // ---- PRIVATE ---->

    #timeOut(time, line, letter) {
        const textList = this.#props.textList;
        
        setTimeout(() => {
            if (line === textList.length) {
                if (this.#props.callback) this.#props.callback();
                clearInterval();
                return
            }

            if (typeof textList[line] === 'number') {
                this.#timeOut(textList[line], ++line, letter = 0);
                return
            };

            if (letter === textList[line].length) {
                this.#timeOut(this.#props.interval, ++line, letter = 0);
                return
            }

            if (typeof textList[line] === 'string') {
                this.#result += textList[line][letter];
                
                DOMWorker.addElement(this.#props.containerSelector, this.#result)

                this.#timeOut(this.#props.interval, line, ++letter);
                return
            }

        }, time);
    }
    
    // <---- PRIVATE ----
}