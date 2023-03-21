'use strict'

import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import ReturnHTML from './ReturnHTML.min.js';

$(() => {

    // SMOOTH SHOW ---->
    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
            $('.rt-loader').remove();
            new ShowIt({ selector: 'header, section, footer', seconds: 0.5 }).smoothShow();

            // ADDING A FOUND BOOK ---->
            $.get('../database/books/information.json', {}, (data) => {
                const searchVal = localStorage.getItem('searchVal');
                const books = [];
        
                $(data).each((index, book) => {
                    if (book.name.toLowerCase() !== searchVal) return
                    books.push(book);
                })
        
                if (books.length === 0) {
                    $('.rt-container-cards').html(` <div class="rt-warning rt-anim-top">Ничего не найдено</div>`);
                    setTimeout(() => { new ShowIt({ selector: '.rt-warning', seconds: 0.5}).smoothShow() }, 50);
                    return
                }
        
                let html = '';
                books.forEach(book => {
                    html += ReturnHTML.card({
                        name: book.name,
                        synopsis: book.synopsis,
                        genres: book.genres,
                        image: book.image,
                        id: book.id
                    })
                })
                $('.rt-container-cards').html(html);

                ShowIt.smoothShowSlicedElements('.rt-card', { start: 0, end: books.length}, 0.5);

                $('.rt-card').on('click', function(event) {
                    event.preventDefault();
                    localStorage.setItem('currentBookId', $(this).attr('id'));
                    window.location.href = 'book.html'
                })
            })
            // <---- ADDING A FOUND BOOK
        }
    })  
    spinner.smoothHideY();
    // <---- SMOOTH SHOW
})