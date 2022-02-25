// const typeItTitleBg = new TypeIt(['Забудь\nнадежду,', 200, ' всяк\nсюда\nвходящий'], 50, 'titleBg');
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