'use strict';

import ReturnHTML from './ReturnHTML.min.js';
import ShowIt from './ShowIt.min.js';

export default class Comment {

    constructor(props) {
        this.props = props

    }
    
    // PUBLIC ---->
    eventAddTextarea() {
        $('.rt-comment .rt-comment__btn').each((index, btn) => {
            const parent = $(btn).parent();

            $(btn).on('click', () => {
                $('.rt-comment .rt-textarea').remove();
                $('.rt-comment .rt-comment__btn').show();

                $(btn).after(ReturnHTML.textarea());
                $(btn).hide();

                setTimeout(() => { new ShowIt({ selector: '.rt-textarea', seconds: 0.2 }).smoothShow() }, 1);
                
                const textarea = $('.rt-comment .rt-textarea textarea');
                textarea.on('input', () => {
                    if ( ! $(textarea).scrollTop() > 0) return
                    $(textarea).css({
                        height: `${$(textarea).prop('scrollHeight')}px`
                    }) 
                })
                
                this.eventAddComment($('.rt-comment button#btn-add-comment'));
            })
        })
    }

    eventAddComment(btn) {
        const comment = btn.parent().parent();
        const textarea = $('textarea', comment);
        const form = $(btn).parent();
        
        form.on('submit', (event) => {
            event.preventDefault();

            $('.rt-comment__btn').show();

            comment.append(ReturnHTML.comment({
                classes: ['rt-comments-inner'],
                name: 'Гость',
                date: new Date().toLocaleDateString(),
                text: textarea.val(),
                img: './images/guest.png'
            }))

            form.remove();

            setTimeout(() => { new ShowIt({ selector: '.rt-comments-inner', seconds: 0.2 }).smoothShow() }, 1);

            this.eventAddTextarea();
        })
        
    }
    // <---- PUBLIC

    // STATIC ---->
    static dynamicTextareaHeight() {
        const textarea = $('.rt-textarea textarea');
        textarea.on('input', () => {
            if ( ! $(textarea).scrollTop() > 0) return
            $(textarea).css({
                height: `${$(textarea).prop('scrollHeight')}px`
            }) 
        })
    }
    // <---- STATIC

}