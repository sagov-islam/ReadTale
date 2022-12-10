'use strict';

import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import DropDown from './DropDown.min.js';
import Filter from './Filter.min.js'
import Slicer from './Slicer.min.js';


$(() => {
    const slicer = new Slicer();
    const filter = new Filter({
        sorting: ['Сначала самые высокооцененные'],
        genres: 'Все жанры',
        callback: sortedBooksInfo => {
            slicer.data = sortedBooksInfo;
            slicer.indexes = { start: 0, end: 8 };

            $('.rt-container-cards').html('');
            slicer.addSlicedBooks('.rt-container-cards');
            ShowIt.smoothShowSlicedElements('.rt-card', slicer.indexes, 0.1);
        }
    })

    // SMOOTH SHOW ---->
    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
            $('.rt-loader').remove();

            const catalog = new ShowIt({ selector: 'header, section, footer', seconds: 0.5 });
            catalog.smoothShow();
            
            filter.sort();
        }
    })  
    spinner.smoothHideY();
    // <---- SMOOTH SHOW

    // BUTTON << FILTRATION >> ---->
    $('button#filter').on('click', () => {
        const selectedGenres = dropDownGenres.selectedInputs;
        const selectedSorting = dropDownSorting.selectedInputs;

        filter.props = {
            sorting: selectedSorting,
            genres: selectedGenres,
            callback: sortedBooksInfo => {
                slicer.data = sortedBooksInfo;
                slicer.indexes = { start: 0, end: 8 };
                
                $('.rt-container-cards').html('');
                slicer.addSlicedBooks('.rt-container-cards');
                ShowIt.smoothShowSlicedElements('.rt-card', slicer.indexes, 0.1);
            }
        };
        filter.sort();  
    });
    // <---- BUTTON << FILTRATION >>


    // SHOW-MORE-BOOKS ---->
    $('button#show-more-books').on('click', () => {
        slicer.indexes = { start: slicer.indexes.end, end: slicer.indexes.end + 8 };
        slicer.addSlicedBooks('.rt-container-cards');
        ShowIt.smoothShowSlicedElements('.rt-card', slicer.indexes, 0.1);
    });
    // <---- SHOW-MORE-BOOKS

    // DROPDOWNS ---->
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
        listSize: '210%',
        transition: 0.2,
        title: 'Сортировка',
        inputName: 'radio',
        list: [
            'Сначала самые высокооцененные',
            'Сначала самые низкооцененные'
        ]
    })
    dropDownSorting.create();
    // <---- DROPDOWNS
});