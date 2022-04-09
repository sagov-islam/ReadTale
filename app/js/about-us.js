'use strict';

import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';

$(() => {

    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
            $('.rt-loader').remove();
            new ShowIt({ selector: 'header, section, footer', seconds: 0.5 }).smoothShow();
        }
    })  
    spinner.smoothHideY();

})