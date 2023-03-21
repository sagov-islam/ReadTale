'use strict';

import TypeIt from './TypeIt.min.js';
import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';

$(() => {
    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
           $('.rt-loader').remove();

            const header = new ShowIt({
                selector: 'header',
                seconds: 0.5,
                callback: () => {

                    const titleBg = new TypeIt({
                        textList: [ 'Забудь\nнадежду,', 150, ' всяк\nсюда\nвходящий'],
                        interval: 40,
                        containerSelector: '.readtale__bg-title',
                        callback: () => {  

                            const text = new ShowIt({
                                selector: '.readtale__text',
                                seconds: 0.5
                            });
                            text.smoothShow();
                        }
                    });
                    titleBg.startTyping();
                }
            })
            header.smoothShow();
        }
    })  
    spinner.smoothHideY();
})