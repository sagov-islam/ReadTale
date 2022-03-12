import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js';
import DropDownEventListener from './DropDownEventListener.min.js';

export default class DropDown {
    
    #props;
    #dropdown;

    constructor(props) {
        this.#props = props;
        this.#dropdown = DOMWorker.findElementAndReturn(`[data-dropdown=${props.dataAtr}]`);
        this.selectedInputs = [];
    }

    // PUBLIC ---->
    create() {
        const dropdown = this.#dropdown;
        const props = this.#props;
        const listSize = props.listSize ?  props.listSize : '120%';
        const buttonSize = 'rt-dropdown-button--size-' + (props.buttonSize === 'big' ? 'big' : props.buttonSize === 'small' ? 'small' : 'normal');
        
        dropdown.addClass(`rt-dropdown ${props.classes ? props.classes.join(' ') : ''}`);

        const list = props.list.map((text) => {
            return ReturnHTML.dropdownItem({
                title: text,
                dataAtr: props.dataAtr,
                inputName: props.inputName
            });
        });
    
        dropdown.html(ReturnHTML.dropdown({
            title: props.title,
            list: list,
            dataAtr: props.dataAtr,
            buttonSize: buttonSize,
            listSize: listSize
        }));

        const inputs = DOMWorker.findElementAndReturn(`.rt-${props.inputName}__input`, dropdown);
        $(inputs).on('click', () => { this.#updateSelectedInputs() })

        DropDownEventListener.closeIfClickWindow(dropdown);
        DropDownEventListener.openIfClickButton(dropdown, props.transition);
    }

    #updateSelectedInputs() {
        this.selectedInputs = [];
        const inputs = DOMWorker.findElementAndReturn(`.rt-${this.#props.inputName}__input`, this.#dropdown);
        
        inputs.each((index, input) => {
            if ($(input).is(':checked')) this.selectedInputs.push(input.value);
            
        }) 
    }
    // <---- PUBLIC
}