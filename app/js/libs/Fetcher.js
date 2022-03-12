export default class Fetcher {
    #informationUrl = '/database/books/information.json'
    #pagesUrl = '/database/books/information.json'

    // PUBLIC ---->
    getBooksInfo() {
        return fetch(this.#informationUrl).then(data => data.json())
    }
    // <---- PUBLIC

}