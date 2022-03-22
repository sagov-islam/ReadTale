import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import ReturnHTML from './ReturnHTML.min.js';
import Comment from './Comment.min.js';
import Slicer from './Slicer.min.js';

$(() => {
    
    // SMOOTH SHOW ---->
    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
            $('.rt-loader').remove();

            const blocks = new ShowIt({ selector: 'header, footer, section', seconds: 0.5 });
            blocks.smoothShow();    
        }
    })
    spinner.smoothHideY();
    // <---- SMOOTH SHOW


    // TABS ---->
    $('.rt-tabs__lines-orange').css({
        width: $('#comments').width(),
        left: $('#comments').position().left
    })
   
    $('.rt-tabs__item').each((index, tab) => {
        $(tab).on('click', () => {
            if (!$('input', tab).is(':checked')) return
            
            $('.rt-tabs__lines-orange').css({
                width: $(tab).width(),
                left: $(tab).position().left
            })
        })
    }) 
    // <---- TABS


    // TABS CONTENT ---->
    $('#chapters-container').hide();

    const tabs = $('.rt-tabs__item');
    const inputs = $('input',  tabs);
    function hideShowTabsContent(hideElement, showElement) {
        new HideIt({
            selector: hideElement,
            px: '0px',
            seconds: 0.2,
            callback: () => {
                $(hideElement).hide();
                $(showElement).show();
                new ShowIt({
                    selector: showElement,
                    seconds: 0.2
                }).smoothShow();
            }
        }).smoothHideY();
        return
    }

    inputs.change(() => {
        tabs.each((index, tab) => {

            const input =  $('input', tab);
            if ( ! $(input).is(':checked')) return

            if (tab.id === 'chapters') {
                hideShowTabsContent('#comments-container', '#chapters-container');
                return
            }

            if (tab.id === 'comments') {
                hideShowTabsContent('#chapters-container', '#comments-container');
                return
            }
        })
        
    })
    // <---- TABS CONTENT


    const comments = [];
    const bookId = parseInt($('.rt-book').attr('id'));

    $.get('../database/comments/comments.json', {}, (data) => {
        $(data).each((index, commentProps) => {
            if (commentProps.bookId !== bookId) return
            comments.push(new Comment(commentProps));
        })
        
        const slicer = new Slicer(comments, { start: 0, end: 5 });
        slicer.addSlicedComments('.rt-comments');
        ShowIt.smoothShowSlicedElements('.rt-comment', slicer.indexes, 0.5);

        $('button#show-more-comments').on('click', () => {
            slicer.indexes = { start: slicer.indexes.end, end: slicer.indexes.end + 5 };
            slicer.addSlicedComments('.rt-comments');
            ShowIt.smoothShowSlicedElements('.rt-comment', slicer.indexes, 0.5);
        })
    })
})