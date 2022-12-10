'use strict';
import BooksInfo from "../database/books.js";
console.log();
export default class Fetcher {
    #informationUrl = '/database/books/information.json'
    #pagesUrl = '/database/books/information.json'

    // PUBLIC ---->
    getBooksInfo() {
        return fetch(this.#informationUrl).then(data => BooksInfo)
    }
    // <---- PUBLIC

}