export default class ReturnHTML {

    // STATIC ---->
    static header() {
        return `<header class="rt-anim-top">
        <div class="rt-header">
            <div class="rt-container-fluid">
                <div class="rt-header__content">
    
                    <div class="rt-header__content-left">
                        <a class="rt-logo" href="index.html">
                            ReadTale
                        </a>
                        <nav class="rt-nav rt-ml-80 rt-header__nav">
                            <ul class="rt-nav__list">
                                <li class="rt-nav__item">
                                    <a class="rt-btn-link" href="index.html">Главная</a>
                                </li>
                                <li class="rt-nav__item">
                                    <a class="rt-btn-link" href="catalog.html">Библиотека</a>
                                </li>
                                <li class="rt-nav__item">
                                    <a class="rt-btn-link" href="">О сообществе</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                
                    <div class="rt-header__content-right">
                        <label class="rt-input-search rt-input--size-big rt-mr-default">
                            <input type="search" class="rt-input-search__input" aria-label="Search a book" placeholder="Поиск...">
                            <span class="rt-input-search__img-wrapper">
                                <svg class="rt-input-search__img" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.22 0a9.23 9.23 0 0 1 6.97 15.22l5.6 5.6a.69.69 0 1 1-.96.98l-5.61-5.6a9.23 9.23 0 1 1-6-16.2Zm0 17.06a7.85 7.85 0 1 0-.02-15.7 7.85 7.85 0 0 0 .02 15.7Z"/>
                                </svg>
                            </span>
                        </label>
                        <button class="rt-btn rt-btn--style-silver rt-btn--size-normal rt-btn--hover-rotate rt-btn--active-darker">Авторизоваться</button>
                    </div>
    
                </div>
            </div>
        </div> 
    </header>`
    }

    static dropdown(props) {
        return `<button class="rt-dropdown__button ${props.buttonSize}" data-dropdown=${props.dataAtr}>
                    <span class="rt-dropdown__button-text" data-dropdown=${props.dataAtr}>${props.title}</span>
                     <img class="rt-dropdown__button-img" src="images/arrow1.svg" alt="" data-dropdown=${props.dataAtr}>
                </button>
                <ul class="rt-dropdown__list" style="transform: translate(0, -15px); opacity: 0; visibility: hidden; min-width: ${props.listSize}" data-simplebar data-dropdown=${props.dataAtr}>
                    ${props.list.join('\n')}
                </ul>
                `
    }

    static dropdownItem(props) {
        return `<li class="rt-dropdown__item" data-dropdown=${props.dataAtr}>
                    ${props.inputName === 'checkbox'
                    ?
                    `
                    <label class="rt-checkbox" data-dropdown=${props.dataAtr}>
                        <p data-dropdown=${props.dataAtr}>${props.title}</p>
                        <input class="rt-checkbox__input" type="checkbox" data-dropdown=${props.dataAtr} name="${props.dataAtr}" value="${props.title}">
                        <span class="rt-checkbox__style" data-dropdown=${props.dataAtr}></span>
                    </label>
                    `
                    : props.inputName === 'radio' ?
                    `
                    <label class="rt-radio" data-dropdown=${props.dataAtr}>
                        <p data-dropdown=${props.dataAtr}>${props.title}</p>
                        <input class="rt-radio__input" type="radio" data-dropdown=${props.dataAtr} name="${props.dataAtr}" value="${props.title}">
                        <span class="rt-radio__style" data-dropdown=${props.dataAtr}></span>
                    </label>
                    `
                    : props.inputName === 'link' ?

                    `
                    <button data-dropdown=${props.dataAtr}>${props.title}</button>

                    
                    `
                    : ''
                    }
                    
                </li>
                `
    }


    static card(props) {
        return `
        <li class="rt-card rt-anim-top">
            <a href="./book.html" class="rt-card__link">
                <div class="rt-card__content">
                    <div class="rt-card__image-wrapper">
                        <img src="${props.image}" alt="${props.name}">
                    </div>
                    <div class="rt-card__synopsis">
                        <p>
                            ${props.synopsis}
                        </p>
                    </div>
                    <div class="rt-card__text">
                        <h4 class="rt-card__title">${props.name}</h4>
                        <p class="rt-card__genres">${props.genres.join(', ')}</p>
                    </div>
                </div>
            </a>
        </li>
        
        `
    }

    static textarea() {
        return `
        <form class="rt-textarea rt-anim-top">
            <textarea name="comment" rows="4" required placeholder="Введите комментарий"></textarea>
            <button type="submit" class="rt-comment__btn" id="btn-add-comment">Оставить комментарий</button>
         </form>
        `
    }

    static comment(props) {
        return `
        <li class="rt-comment rt-anim-top ${props.classes ? props.classes.join(' ') : ''}">
            <div class="rt-comment__user">
                <img class="rt-comment__img" width="40" height="40" src="${props.img}" alt="${props.name}">
                <span class="rt-comment__nickname">${props.name}</span>
                <span class="rt-comment__date">${props.date}</span>
            </div>
            <p class="rt-comment__text rt-text">${props.text}</p>
            <button class="rt-comment__btn">Ответить</button>
        </li>
        `
    }

    static input(props) {
        return `
        <input class="rt-modal__input rt-input-text rt-input-text--size-fluid" type="${props.type}" name="${props.name}" placeholder="${props.placeholder}" autocomplete="${props.autocomplete ? 'on' : 'off' }">

        `
    }

    static modalInner(props) {
        return `
        <h3 class="rt-modal__title rt-text-center">${props.title}</h3>
        <form action="" class="rt-modal__form">
            <ul>
                ${props.inputs.join('')}
            </ul>
            ${
                props.agreement ?
                `
                    <div class="rt-modal__agreement">
                        <label class="rt-checkbox">
                            <input class="rt-checkbox__input" type="checkbox">
                            <span class="rt-checkbox__style"></span>
                            <p>Я согласен на обработку персональных данных</p>
                        </label>
                    </div>
                `
                : ''
            }
            
            <button type="submit" class="rt-modal__main-btn rt-btn rt-btn--size-fluid rt-btn--style-orange">${props.btnText}</button>
        </form>
        `
    }

    static grade() {
        return `
            <ul class="rt-stars rt-mr-default">
                <li class="rt-stars__item" id="0">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="1">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="2">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="3">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="4">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="5">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="6">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="7">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="8">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
                <li class="rt-stars__item" id="9">
                        <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.5 0 4.79 9.874L31 11.467l-7.75 7.681L25.079 30 15.5 24.874 5.921 30 7.75 19.148 0 11.467l10.71-1.593L15.5 0Z"/></svg>
                </li>
            </ul>
        
        `
    }
    // <---- STATIC
}