import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js'

$(() => {

    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
            DOMWorker.findElementAndReturn('.rt-loader').remove();

            const catalog = new ShowIt({
                selector: '.rt-anim-top',
                seconds: 0.5
            })
            catalog.smoothShow();
        }
    })  
    spinner.smoothHideY();
});