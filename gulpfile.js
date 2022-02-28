const {src, dest, watch, parallel, series} = require('gulp');


const server = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const cssimport = require('gulp-cssimport');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const imagemin = require('gulp-imagemin');

function startServer() {
    server.init({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
}

function styles() {
    return src(['app/scss/variables.scss', 'app/scss/reboot.scss' , 'app/scss/**/*.scss'])
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(prefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(server.stream())
}


function scripts() {
    return src(['app/js/libs/**/*.js', 'app/js/app.js'])
        .pipe(rename({ suffix: '.min' }))
        // .pipe(concat('main.min.js'))
        // .pipe(uglify())
        .pipe(dest('app/scripts'))
        .pipe(server.stream())
}


function deleteDist() {
    return del('dist')
}


function html() {
    return src('app/*.html')
        .pipe(rename({ suffix: '.min' }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'))
}


function images() {
    return src( 'app/images/**/*.+(jpg|svg|png)', { base: 'app/images' })
    .pipe(imagemin({
        verbose: true
    }))
    .pipe(dest('dist/images'))
}


function build() {
    return src([
        'app/css/style.min.css',
        'app/js/min/'
    ], {base: 'app'})
    .pipe(dest('dist/'))
}


function watcher() {
    watch(['app/*.html']).on('change', server.reload);
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js'], scripts);
}


exports.build = series(deleteDist, build, html, images)
exports.default = parallel(startServer, styles, scripts, watcher)