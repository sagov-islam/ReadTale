import Fetcher from './Fetcher.min.js'
import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js';

export default class Books {

    constructor(containerSelector, booksInfo) {
        this.container = DOMWorker.findElementAndReturn(containerSelector);
        this.booksInfo = booksInfo;

        this.indexes = {
            start: 0,
            end: 10
        }
    }

    // PUBLIC ---->
    addSlicedCards() {
        let cards = '';
        const books = this.booksInfo.slice(this.indexes.start, this.indexes.end);
        console.log(this.booksInfo);

        books.forEach(book => {
            cards += ReturnHTML.card({
                name: book.name,
                synopsis: book.synopsis,
                genres: book.genres,
                image: book.image
            })
        })
        
        this.container.append(cards);

        if (this.booksInfo.length <= 10) $('button#showMore').addClass('rt-hide');
        if (this.booksInfo.length > 10) $('button#showMore').removeClass('rt-hide');
    }
    // <---- PUBLIC


}
