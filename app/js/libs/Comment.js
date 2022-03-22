import HideIt from './HideIt.min.js';
import ReturnHTML from './ReturnHTML.min.js';
import ShowIt from './ShowIt.min.js';

export default class Comment {

    constructor(props) {
        this.props = props

    }

    eventAddTextarea() {
        $('.rt-comment__btn').each((index, btn) => {
            const parent = $(btn).parent();

            $(btn).on('click', () => {
                $('.rt-add-comment').remove();
                $('.rt-comment__btn').show();

                $(btn).after(ReturnHTML.textarea());
                $(btn).hide();

                setTimeout(() => { new ShowIt({ selector: '.rt-add-comment', seconds: 0.2 }).smoothShow() }, 1);
                
                const textarea = $('.rt-add-comment textarea')
                textarea.on('input', () => {
                    if ( ! $(textarea).scrollTop() > 0) return
                    $(textarea).css({
                        height: `${$(textarea).prop('scrollHeight')}px`
                    }) 
                })

                this.eventAddComment($('button#btn-add-comment'))
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

            const value = textarea.val()
            comment.append(ReturnHTML.comment({
                classes: ['rt-comments-inner'],
                text: value
            }))

            form.remove();

            setTimeout(() => { new ShowIt({ selector: '.rt-comments-inner', seconds: 0.2 }).smoothShow() }, 1);

            this.eventAddTextarea();
        })
        
    }

}