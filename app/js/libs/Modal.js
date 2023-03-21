'use strict';

import ReturnHTML from './ReturnHTML.min.js'
import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';

export default class Modal {

    constructor(props) {
        this.props = props;
    }

    // PUBLIC ---->
    create() {
        const props = this.props;
        const modal = this.#returnModal();

        if (props.stars) {
            this.#gradeModal(modal);
            return
        }

        $(modal).html(ReturnHTML.modalInner({
            title: props.title,
            inputs: this.#returnInputs(),
            agreement: props.agreement,
            btnText: props.btnText
        }))

        $('.rt-modal').append(modal);
        
        this.#eventOpenModal(modal);
        this.#eventWindowClick(modal);
    }
    // <---- PUBLIC

    // PRIVATE ---->
    #returnModal() {
        const props = this.props;

        const modal = document.createElement('div');
        $(modal).addClass('rt-modal__content rt-anim-top');
        $(modal).data().modal = props.name;
        return modal;
    }

    #returnInputs() {
        const props = this.props;

        const inputs = props.inputs.map((input) => {
            return `
            <li>
                ${ ReturnHTML.input({
                    type: input.type,
                    name: input.name,
                    placeholder: input.placeholder,
                    autocomplete: input.autocomplete
                })}
            </li> `
        })
        return inputs
    }

    #eventOpenModal(modal) {
        const props = this.props;

        $(`button[data-modal="${props.name}"]`).on('click', () => {
            this.#show(modal);
        })
    }

    #eventWindowClick(modal) {
        $('.rt-modal').on('mousedown', (event) => {
            if ( ! event.target.classList.contains('rt-modal')) return
            this.#hide(modal);
        })
    }

    #eventGrade(modal) {
        const stars = $('.rt-stars__item', modal);
        const svgList = $('svg', stars);

        $(stars).on('mouseover', function () {
            svgList.css({ fill: '#444' });

            const id = $(this).attr('id');
            stars.each((index, star) => {
                if (index > id) return
                $(svgList[index]).css({ fill: '#EF4800' })
            });
        });

        $(stars).on('mouseout', () => {
            $('svg', stars).css({ fill: '#444' })
        });

        $(stars).on('click', (event) => {
            const grade = +$(event.currentTarget).attr('id') + 1;
            const bookId = $('.rt-book').attr('id');
            this.#hide(modal);
        })
    }

    #gradeModal(modal) {
        $(modal).html(ReturnHTML.grade());

        $('.rt-modal').append(modal);
        
        this.#eventOpenModal(modal);
        this.#eventGrade(modal);
        this.#eventWindowClick(modal);
    }

    #show(modal) {
        $('body > .simplebar-vertical').first().hide();
        new ShowIt({
            selector: '.rt-modal',
            seconds: 0.2,
        }).smoothShow();

        new ShowIt({
            selector: modal,
            seconds: 0.2
        }).smoothShow();
    }

    #hide(modal) {
        $('body > .simplebar-vertical').first().show();
        new HideIt({
            selector: modal,
            seconds: 0.2,
            px: '-20px',
        }).smoothHideY();

        new HideIt({
            selector: '.rt-modal',
            seconds: 0.2,
            px: '0px',
        }).smoothHideY();
    }

    // < ---- PRIVATE

}