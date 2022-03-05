import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js'

$(() => {
    // HEADER:
    DOMWorker.prepend('body > .simplebar-wrapper .simplebar-content', ReturnHTML.header());
});
