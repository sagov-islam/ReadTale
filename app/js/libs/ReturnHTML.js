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
                    :
                    `
                    <label class="rt-radio" data-dropdown=${props.dataAtr}>
                        <p data-dropdown=${props.dataAtr}>${props.title}</p>
                        <input class="rt-radio__input" type="radio" data-dropdown=${props.dataAtr} name="${props.dataAtr}" value="${props.title}">
                        <span class="rt-radio__style" data-dropdown=${props.dataAtr}></span>
                    </label>
                    `
                    }
                    
                </li>
                `
    }


    static card(props) {
        return `
        <li class="rt-card rt-anim-top">
            <a href="" class="rt-card__link">
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
    // <---- STATIC
}