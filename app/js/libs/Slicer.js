'use strict';

import ReturnHTML from './ReturnHTML.min.js';
import Comment from './Comment.min.js';

export default class Slicer {

    constructor(data, indexes) {
        this.data = data;
        this.indexes = indexes
    }

    // PUBLIC ---->
    addSlicedComments(containerSelector) {
        const container = $(containerSelector);
        const comments = this.data.slice(this.indexes.start, this.indexes.end);
   
        let html = '';
        $(comments).each((index, comment) => {
            html += ReturnHTML.comment({
                name: comment.props.name,
                date: comment.props.date,
                text: comment.props.text,
                img: comment.props.img
            })
        });
        container.append(html);

        const comment = new Comment();
        comment.eventAddTextarea();

        if (this.data.length <= 5) $('button#show-more-comments').hide();
        if (this.data.length > 5) $('button#show-more-comments').show();
        if (this.indexes.end >= this.data.length) $('button#show-more-comments').hide();
    }

    addSlicedBooks(containerSelector) {
        const container = $(containerSelector);
        const books = this.data.slice(this.indexes.start, this.indexes.end);

        let html = '';
        books.forEach(book => {
            html += ReturnHTML.card({
                name: book.name,
                synopsis: book.synopsis,
                genres: book.genres,
                image: book.image
            })
        })
        
        container.append(html);

        if (this.data.length <= 5) $('button#show-more-books').hide();
        if (this.data.length > 5) $('button#show-more-books').show();
        if (this.indexes.end >= this.data.length) $('button#show-more-books').hide();
    }
    // <---- PUBLIC
}