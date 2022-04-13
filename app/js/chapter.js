'use strict';

import DropDown from './DropDown.min.js';
import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import Comment from './Comment.min.js';
import Slicer from './Slicer.min.js';

$(() => {
    const slicer = new Slicer([], { start: 0, end: 5 }); 
    const bookId = +localStorage.getItem('currentBookId');

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

    
    let currentPage = 1;
    let currentChapter = localStorage.getItem('chapterNum');

    let pages;
    let chapters;

    let pagesCount;
    let chaptersCount;

    $.get('../database/books/information.json', {}, (data) => {

        $(data).each((index, book) => {
            if (book.id !== bookId) return
            chapters = book.chapters;
        })

        $.get(`${chapters[currentChapter].link}`, {dataType: "text"}, (link) => {
            pages = returnPages(link);

            pagesCount = Object.keys(pages).length
            chaptersCount = Object.keys(chapters).length

            const array = [];
            let i = 1;
            for(i; i <= pagesCount; i++) { array[i - 1] = i };
            
            new DropDown({
                dataAtr: 'pages',
                buttonSize: 'normal',
                listSize: '100%',
                transition: 0.2,
                title: 'Страницы',
                inputName: 'link',
                list: returnList(pagesCount),
                callback: function(dropDown) {
                    const buttons = $('.rt-dropdown__item button', dropDown );

                    buttons.on('click', function() {
                        currentPage = parseInt($(this).text());

                        if (currentPage > pagesCount) {
                            document.location.href = "book.html";
                            return
                        }
                
                        $('.rt-page__text').html(pages[currentPage]);
                        $('.rt-page__info-page').html(`Страница ${currentPage}`);
                        $('.rt-page__info-chapter').html(`Глава ${currentChapter}`);
                
                        updateComments();
                    })
                }
            }).create();

            new DropDown({
                dataAtr: 'chapters',
                classes: ['rt-mr-default'],
                buttonSize: 'normal',
                listSize: '100%',
                transition: 0.2,
                title: 'Главы',
                inputName: 'link',
                list: returnList(chaptersCount),
                callback: function(dropDown) {
                    const buttons = $('.rt-dropdown__item button', dropDown );

                    buttons.on('click', function() {
                        currentChapter = parseInt($(this).text());
                        currentPage = 1;
                        
                        $.get(`${chapters[currentChapter].link}`, {dataType: "text"}, (link) => {
                            pages = returnPages(link);
                            pagesCount = Object.keys(pages).length;

                            $('.rt-page__text').html(pages[currentPage]);
                            $('.rt-page__info-page').html(`Страница ${currentPage}`);
                            $('.rt-page__info-chapter').html(`Глава ${currentChapter}`);
                    
                            updateComments();
                            createNewDropDownPages();
                        })
                        
                    })
                }
            }).create();

            $('.rt-page__text').html(pages[currentPage]);
            $('.rt-page__info-page').html(`Страница ${currentPage}`);
            $('.rt-page__info-chapter').html(`Глава ${currentChapter}`);
        })
 
    })

    

    // BUTTON NEXT PAGE --->
    $('button#next-page').on('click', function() {
        if (currentPage >= pagesCount) {
            if (chapters[++currentChapter]) {
                loadNewChapter();
                return
            }
            document.location.href = "book.html";
        }

        $('.rt-page__text').html(pages[++currentPage])
        $('.rt-page__info-page').html(`Страница ${currentPage}`);
        $('.rt-page__info-chapter').html(`Глава ${currentChapter}`);

        updateComments();
    })
    // <---- BUTTON NEXT PAGE


    // BUTTON LAST PAGE --->
    $('button#last-page').on('click', function() {
        if (currentPage === 1) {
            if (chapters[--currentChapter]) {
                loadNewChapter();
                return
            }
            document.location.href = "book.html";
        }

        $('.rt-page__text').html(pages[--currentPage])
        $('.rt-page__info-page').html(`Страница ${currentPage}`);
        $('.rt-page__info-chapter').html(`Глава ${currentChapter}`);

        updateComments();
    })
    // <---- BUTTON LAST PAGE


    // SHOW MORE COMMENTS ---->
    let allShowed = false;
    $('button#show-more-comments').on('click', () => {
        slicer.indexes = { start: slicer.indexes.end, end: slicer.indexes.end + 5 };
        slicer.addSlicedComments('.rt-comments');
        ShowIt.smoothShowSlicedElements('.rt-comment', slicer.indexes, 0.5);

        if (slicer.indexes.end <= slicer.data.length) return
        allShowed = true;   
    })
    // <---- SHOW MORE COMMENTS


    // TEXTAREA ---->
    Comment.dynamicTextareaHeight();
    $('#main-textarea').on('submit', function(event) {
        event.preventDefault();

        const textarea = $('textarea', $(this));
        
        slicer.data.push(new Comment({
            name: 'Гость',
            date: new Date().toLocaleDateString(),
            text: $(textarea).val(),
            img: './images/guest.png'
        }))
        textarea.val('');

        if (slicer.indexes.end >= slicer.data.length) allShowed = true;   
        if ( ! allShowed) return

        slicer.indexes = { start: slicer.data.length - 1, end: slicer.data.length };
        slicer.addSlicedComments('#main-comments');
        ShowIt.smoothShowSlicedElements('.rt-comments > .rt-comment', slicer.indexes, 0.5);
    })
    // <---- TEXTAREA


    // HELPER FUNCTIONS ---->
    function returnList(num) {
        const array = [];
        for(let i = 1; i <= num; i++) { array[i - 1] = i };
        return array
    }
    
    function createNewDropDownPages() {
        $('[data-dropdown="pages"]').html('');
        new DropDown({
            dataAtr: 'pages',
            buttonSize: 'normal',
            listSize: '100%',
            transition: 0.2,
            title: 'Страницы',
            inputName: 'link',
            list: returnList(pagesCount),
            callback: function(dropDown) {
                const buttons = $('.rt-dropdown__item button', dropDown );

                buttons.on('click', function() {
                    currentPage = parseInt($(this).text());

                    if (currentPage > pagesCount) {
                        document.location.href = "book.html";
                        return
                    }
            
                    $('.rt-page__text').html(pages[currentPage]);
                    $('.rt-page__info-page').html(`Страница ${currentPage}`);
                    $('.rt-page__info-chapter').html(`Глава ${currentChapter}`);
            
                    updateComments();
                })
            }
        }).create();
    }

    function dropDown(props, count) {
        const array = [];
        let i = 1;
        for(i; i <= count; i++) { array[i - 1] = i };
        
        return new DropDown({
            dataAtr: props.dataAtr,
            classes: props.classes,
            buttonSize: props.buttonSize,
            listSize: props.listSize,
            transition: props.transition,
            title: props.title,
            inputName: props.inputName,
            callback: props.callback,
            list: array
        })
    }

    let comments = [];
    function updateComments() {
        $.get('../database/comments/chapter-comments.json', {}, (data) => {
            $('.rt-comments').html('');
            comments = [];

            $(data).each((index, commentProps) => {
                
                if (commentProps.bookId !== bookId) return
                if (commentProps.page !== currentPage) return
                comments.push(new Comment(commentProps));
            })
    
            slicer.data = comments;
            slicer.indexes = { start: 0, end: 5 };
            slicer.addSlicedComments('.rt-comments');
            ShowIt.smoothShowSlicedElements('.rt-comment', slicer.indexes, 0.5); 
        })
    }
    updateComments();

    function returnPages(data) {
        const array = data.split('');
        let pages = {};
        let way = { start: 0, end: 3115};
        let pageNum = 1;


        pages[pageNum] = [];
        $(array).each((index, item) => {
            if (index >= way.start && index <= way.end) {
                pages[pageNum] += item;
                return
            }
            pages[++pageNum] = [];
            way.start = way.end;
            way.end += 3115;
        })
        
        return pages 
    }

    function loadNewChapter() {
        currentPage = 1;
                        
        $.get(`${chapters[currentChapter].link}`, {dataType: "text"}, (link) => {
            pages = returnPages(link);
            pagesCount = Object.keys(pages).length;

            $('.rt-page__text').html(pages[currentPage]);
            $('.rt-page__info-page').html(`Страница ${currentPage}`);
            $('.rt-page__info-chapter').html(`Глава ${currentChapter}`);
    
            updateComments();
            createNewDropDownPages();
        })
    }
    // <---- HELPER FUNCTIONS

})