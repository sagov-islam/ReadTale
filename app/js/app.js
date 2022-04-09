'use strict';

import Modal from './Modal.min.js'
import HideIt from './HideIt.min.js';
import ShowIt from './ShowIt.min.js';

$(() => {

    // MODAL SIGNUP ---->
    const modalSignUp = new Modal({
        name: 'sign-up',
        title: 'Регистрация',
        inputs: [
            {
                type: 'text',
                name: 'Login',
                placeholder: 'Логин',
                autocomplete: true
            },
            {
                type: 'email',
                name: 'email',
                placeholder: 'Введи электронную почту',
                autocomplete: true
            },
            {
                type: 'password',
                name: 'password',
                placeholder: 'Введи пароль',
                autocomplete: true
            },
            {
                type: 'password',
                name: 'repeated-password',
                placeholder: 'Повторите пароль',
                autocomplete: true
            },
        ],
        agreement: true,
        btnText: 'Зарегистрироваться'
    })
    modalSignUp.create();
    // <---- MODAL SIGNUP


    // MODAL SIGNIN ---->
    const modalSignIn = new Modal({
        name: 'sign-in',
        title: 'Войти',
        inputs: [
            {
                type: 'email',
                name: 'email',
                placeholder: 'Введи электронную почту',
                autocomplete: true
            },
            {
                type: 'password',
                name: 'password',
                placeholder: 'Введи пароль',
                autocomplete: true
            }
        ],
        agreement: false,
        btnText: 'Войти'
    })
    modalSignIn.create();
    // <---- MODAL SIGNIN


    // MENU << HAMBURGER >> ---->
    const hamburgerBtn = $('.rt-hamburger__btn');
    if (hamburgerBtn) {
        let id
        let parent;

        hamburgerBtn.on('click', function() {
            parent =  $(this).parent();
            id = parent.attr('id');
            
            if (id === 'hide') {
                parent.attr('id', 'show');
  
                new ShowIt({
                    selector: '.rt-hamburger__content',
                    context: parent,
                    seconds: 0.2,
                    callback: () => {
                        $(window).on( 'mousedown', function(event) {
                            if (parent.attr('id') !== 'show') return
                            if ($(event.target).data().id === 'hamburger') return

                            parent.attr('id', 'hide');
                    
                            new HideIt({
                                selector: '.rt-hamburger__content',
                                context: parent,
                                seconds: 0.2,
                                px: '-10px'
                            }).smoothHideY();
                        });
                    }
  
                }).smoothShow();
                return
            }
           
            if (id === 'show') {
                parent.attr('id', 'hide');
                new HideIt({
                    selector: '.rt-hamburger__content',
                    context: parent,
                    seconds: 0.2,
                    px: '-10px'
                }).smoothHideY();
                return
            }
        })
    }
    // <---- MENU << HAMBURGER >>
});


