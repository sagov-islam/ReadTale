import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js'

$(() => {
    // HEADER:
    DOMWorker.prepend('.simplebar-content', ReturnHTML.header());
});
