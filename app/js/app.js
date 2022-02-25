import TypeIt from './typeIt.min.js'

const typeItTitleBg = new TypeIt({
    textList: [
        'Забудь\nнадежду,',
        200,
        ' всяк\nсюда\nвходящий'
    ],
    interval: 50,
    dataAtr: 'titleBg'
});
typeItTitleBg.start()