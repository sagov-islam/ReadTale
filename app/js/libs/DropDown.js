import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js';
import { visible } from './variables.min.js';
import DropDownEventListener from './DropDownEventListener.min.js';

export default class DropDown {
    
    #props;
    #dropdown;

    constructor(props) {
        this.#props = props;

        this.#dropdown = DOMWorker.findElementAndReturn(`[data-dropdown=${props.dataAtr}]`);
    }

    // PUBLIC ---->
    create() {
        const dropdown = this.#dropdown;
        const props = this.#props;

        const sizeClass = 'rt-dropdown--size-' + (props.size === 'big' ? 'big' : props.size === 'small' ? 'small' : 'normal');
        dropdown.addClass(`rt-dropdown ${sizeClass} ${props.classes ? props.classes.join(' ') : ''}`);

        const dropdownList = props.list.map((title) => {
            return ReturnHTML.dropdownItem({
                title: title,
                dataAtr: props.dataAtr
            });
        });
    
        dropdown.html(ReturnHTML.dropdown({
            title: props.title,
            list: dropdownList,
            dataAtr: props.dataAtr
        }));

        DropDownEventListener.closeIfClickWindow(dropdown);
        DropDownEventListener.openIfClickButton(dropdown, props.transition);
    }
    // <---- PUBLIC
}