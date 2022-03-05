export default class EventListener {

    // STATIC ---->
    static clickWindow(callback) {
        window.addEventListener( 'click', (event) => {
            callback(event);
        });
    }
    // <---- STATIC
}