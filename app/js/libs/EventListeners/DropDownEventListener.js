import EventListener from './EventListener.min.js';
import DOMWorker from './DomWorker.min.js';
import { visible, invisible } from './variables.min.js';

export default class DropDownEventListener extends EventListener {
    
    // STATIC ---->
    static closeIfClickWindow(dropdown) {
        const list = DOMWorker.findElementAndReturn('.rt-dropdown__list', dropdown);
        const arrorw = DOMWorker.findElementAndReturn('.rt-dropdown__button-img', dropdown);
        const dataAtr = $(dropdown).data().dropdown;

        this.clickWindow((event) => {
            if ($(event.target).data().dropdown === dataAtr) return

            list.css(invisible);
            dropdown.removeClass('focus');
            arrorw.removeClass('rt-anim-rotate');
        })
    }

    static openIfClickButton(dropdown, transition = 0.2) {
        visible.transition = `${transition}s`;

        const list = DOMWorker.findElementAndReturn('.rt-dropdown__list', dropdown);
        const button = DOMWorker.findElementAndReturn('.rt-dropdown__button', dropdown);
        const arrorw = DOMWorker.findElementAndReturn('.rt-dropdown__button-img', dropdown);
        
        button.on('click', () => {
            const isHasFocus = dropdown[0].classList.contains('focus');

            if (isHasFocus) {
                list.css(invisible);
                dropdown.removeClass('focus');
                arrorw.removeClass('rt-anim-rotate');
                return
            }
            
            list.css(visible);
            dropdown.addClass('focus');
            arrorw.addClass('rt-anim-rotate');  
        });
    }
    // <---- STATIC
}