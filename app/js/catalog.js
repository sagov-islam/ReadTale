import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import DOMWorker from './DomWorker.min.js';
import DropDown from './DropDown.min.js';
import Books from './Books.min.js';
import Filter from './Filter.min.js'

$(() => {
    const books = new Books('.rt-container-cards');
    const filter = new Filter({
        sorting: ['Сначала самые высокооцененные'],
        genres: 'Все жанры',
        callback: sortedBooksInfo => {
            books.booksInfo = sortedBooksInfo
            books.container.html('');
            books.addSlicedCards();
            ShowIt.smoothShowCards(books.indexes, 0.1, 100)
        }
    })

    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
            DOMWorker.findElementAndReturn('.rt-loader').remove();

            const catalog = new ShowIt({ selector: 'header, section, footer', seconds: 0.5 });
            catalog.smoothShow();
            
            filter.sort();
        }
    })  
    spinner.smoothHideY();

    const dropDownGenres = new DropDown({
        dataAtr: 'genres',
        classes: ['rt-mr-default'],
        buttonSize: 'normal',
        listSize: '135%',
        transition: 0.2,
        title: 'Жанры',
        inputName: 'checkbox',
        list: [
            'Приключения',
            'Детектив',
            'Ужасы',
            'Триллер',
            'Комедия',
            'Драма',
            'Фэнтези',
            'Фантастика',
            'Контркультура',
            'Боевик',
            'Психологический',
            'Философский',
            'Социальный',
            'Фарс',
            'Романтика',
            'Сатира',
            'Эпик',
            'Исторический',
            'Магический реализм'
        ]
    })
    dropDownGenres.create();

    const dropDownSorting = new DropDown({
        dataAtr: 'sorting',
        classes: ['rt-mr-default'],
        buttonSize: 'normal',
        listSize: '190%',
        transition: 0.2,
        title: 'Сортировка',
        inputName: 'radio',
        list: [
            'Сначала самые высокооцененные',
            'Сначала самые низкооцененные'
        ]
    })
    dropDownSorting.create();
    
    $('button#filter').on('click', () => {
        const selectedGenres = dropDownGenres.selectedInputs;
        const selectedSorting = dropDownSorting.selectedInputs;

        filter.props = {
            sorting: selectedSorting,
            genres: selectedGenres,
            callback: sortedBooksInfo => {
                books.booksInfo = sortedBooksInfo;
                books.container.html('');
                books.indexes = {start: 0, end: 10};
                books.addSlicedCards();
                ShowIt.smoothShowCards(books.indexes, 0.1, 100);
            }
        };
        filter.sort();  
    });

    $('button#showMore').on('click', () => { 
        
        books.indexes = {
            start: books.indexes.end,
            end: books.indexes.end += 10
        }
        books.addSlicedCards();
        ShowIt.smoothShowCards(books.indexes, 0.1, 100);

        if (books.indexes.end >= books.booksInfo.length) {
            $('button#showMore').addClass('rt-hide');
        } 
    });
});