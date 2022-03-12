import Fetcher from './Fetcher.min.js'
import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js';

export default class Filter {
    #Fetcher = new Fetcher();
    
    constructor(props) {
        this.props = props


    }

    // PUBLIC ---->
    sort() {
        let genres = this.props.genres;
        const sorting = this.props.sorting.length !== 0 ? this.props.sorting : ['Сначала самые высокооцененные'];
        const callback = this.props.callback;

        if (sorting[0] === 'Сначала самые высокооцененные') {
            let method;
            
            if (genres === 'Все жанры' || typeof genres === 'object' && genres.length <= 0) {
                method = this.#Fetcher.getBooksInfo() ;
            } else {
                method = this.#sortByGenres();
            }
           
            method.then(books => {
                const sortedBooksInfo = this.#sortHighlyRatedFirst(books);
                callback(sortedBooksInfo);
            })
            return
        }

        if (sorting[0] === 'Сначала самые низкооцененные') {
            let method;
            
            if (genres === 'Все жанры' || typeof genres === 'object' && genres.length <= 0) {
                method = this.#Fetcher.getBooksInfo() ;
            } else {
                method = this.#sortByGenres();
            }

            method.then(books => {
                const sortedBooksInfo = this.#sortLowRatedFirst(books);
                callback(sortedBooksInfo);
            })
            return
        }
    }
    // <---- PUBLIC


    // PRIVATE ---->
    #sortHighlyRatedFirst(books) {
        books.sort((a, b) => b.stars - a.stars);
        return books
    }

    #sortLowRatedFirst(books) {
        books.sort((a, b) => a.stars - b.stars);
        return books
    }

    #sortByGenres() {
        let genres = this.props.genres
        let sortedBooks = [];

        return this.#Fetcher.getBooksInfo().then(data => {           
            data.forEach(book => {
                let hasGenre = false;

                for (let genre of book.genres) {
                    if (hasGenre) continue

                    genres.forEach((selectedGenre) => {
                        if (genre.toLowerCase() === selectedGenre.toLowerCase()) {

                            sortedBooks.push(book);
                            hasGenre = true;
                        }
                    })
                }
            });
            return sortedBooks;
        })    
    }
    // <---- PRIVATE

}