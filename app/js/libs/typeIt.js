class TypeIt {

    #letter = 0;
    #line = 0;
    #result = '';

    #textList;
    #interval;
    #dataAtr;
    #callback;

    constructor(textList, interval, dataAtr, callback) {
        this.#textList = textList;
        this.#interval = interval;
        this.#dataAtr = dataAtr;
        this.#callback = callback
    }

    start() {
        this.#timeOut(this.#interval, this.#line, this.#letter)
    }

    #timeOut(time, line, letter) {
        const arr = this.#textList;
        
        setTimeout(() => {
            if (line === arr.length) {
                if (this.#callback) this.#callback()
                clearInterval();
                return
            }

            if (typeof arr[line] === 'number') {
                this.#timeOut(arr[line], ++line, letter = 0);
                return
            };

            if (letter === arr[line].length) {
                this.#timeOut(this.#interval, ++line, letter = 0);
                return
            }

            if (typeof arr[line] === 'string') {
                this.#result += arr[line][letter];
                this.#render();
                this.#timeOut(this.#interval, line, ++letter);
                return
            }

        }, time);
    }

    #render() {
        $(`[data-typeit-${this.#dataAtr}]`).html(this.#result);
    }

}