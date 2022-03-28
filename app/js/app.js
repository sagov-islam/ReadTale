import DOMWorker from './DomWorker.min.js';
import ReturnHTML from './ReturnHTML.min.js'
import Modal from './Modal.min.js'

$(() => {

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

});


