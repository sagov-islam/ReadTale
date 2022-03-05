import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';
import DOMWorker from './DomWorker.min.js';
import DropDown from './DropDown.min.js';

$(() => {

    const spinner = new HideIt({
        selector: '.rt-loader__content',
        px: '50px',
        seconds: 0.5,
        callback: () => {
            DOMWorker.findElementAndReturn('.rt-loader').remove();

            const catalog = new ShowIt({
                selector: 'header, section',
                seconds: 0.5
            })
            catalog.smoothShow();
        }
    })  
    spinner.smoothHideY();

    

    const dropDownGenres = new DropDown({
        dataAtr: 'genres',
        classes: ['rt-mr-default'],
        size: 'normal',
        transition: 0.2,
        title: 'Жанры',
        list: [
            'Приключения',
            'Детектив',
            'Ужасы',
            'Триллер',
            'Комедия',
            'Драма'
        ]
    })
    dropDownGenres.create();


});