import TypeIt from './typeIt.min.js';
import HideIt from './hideIt.min.js';
import ShowIt from './showIt.min.js';
import DOMWorker from './domWorker.min.js';

const location = window.location.pathname;

if (location == '/index.html') {
    $(() => {
        HideIt.hideX('.readtale__text', '-20px');
    
        const spinner = new HideIt({
            selector: '.rt-loader__content',
            px: '50px',
            seconds: 0.5,
            callback: () => {
                DOMWorker.findElementAndReturn('.rt-loader').remove();
    
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
}

if (location === '/catalog.html') {
    $(() => {
        const spinner = new HideIt({
            selector: '.rt-loader__content',
            px: '50px',
            seconds: 0.5,
            callback: () => {
                DOMWorker.findElementAndReturn('.rt-loader').remove();

                const header = new ShowIt({
                    selector: '.rt-anim-top',
                    seconds: 0.5
                })
                header.smoothShow();
            }
        })  
        spinner.smoothHideY();
        
    });
    
}
