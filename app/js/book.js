'use strict';

import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import Comment from './Comment.min.js';
import Slicer from './Slicer.min.js';
import Modal from './Modal.min.js';

$(() => {
    const bookId = parseInt($('body').data().bookid);
    
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

    const slicer = new Slicer([], { start: 0, end: 5 });
    let allShowed = false;
    
    // TEXTAREA ---->
    Comment.dynamicTextareaHeight();
    $('#main-textarea').on('submit', function(event) {
        event.preventDefault();

        const textarea = $('textarea', $(this));

        slicer.data.push(new Comment({
            name: 'Гость',
            date: new Date().toLocaleDateString(),
            text: textarea.val(),
            img: './images/user-image.jpg'
        }))

        if ( ! allShowed) return
        slicer.indexes = { start: slicer.data.length - 1, end: slicer.data.length };
        slicer.addSlicedComments('#main-comments');
        ShowIt.smoothShowSlicedElements('.rt-comment', slicer.indexes, 0.5);
    })
    // <---- TEXTAREA

    // COMMENTS ---->
    const comments = [];
    $.get('../database/comments/comments.json', {}, (data) => {

        $(data).each((index, commentProps) => {
            if (commentProps.bookId !== bookId) return
            comments.push(new Comment(commentProps));
        })

        slicer.data = comments;
        slicer.addSlicedComments('.rt-comments');
        ShowIt.smoothShowSlicedElements('.rt-comment', slicer.indexes, 0.5);

        
    })
    // <---- COMMENTS

    // SHOW MORE COMMENTS ---->
    $('button#show-more-comments').on('click', () => {
        slicer.indexes = { start: slicer.indexes.end, end: slicer.indexes.end + 5 };
        slicer.addSlicedComments('.rt-comments');
        ShowIt.smoothShowSlicedElements('.rt-comment', slicer.indexes, 0.5);

        if (slicer.indexes.end <= slicer.data.length) return
        allShowed = true;
    })
    // < ---- SHOW MORE COMMENTS

    $('.rt-chapter__link').on('click', function(event) {
        event.preventDefault();

        const chapterNum = $('.rt-chapter__num', $(this)).text();
        localStorage.setItem('chapterNum', chapterNum);

        document.location.href = "chapter.html";
    })


    // GRADE ---->
    new Modal({
        stars: true,
        name: 'grade'
    }).create();
    // <---- GRADE
})