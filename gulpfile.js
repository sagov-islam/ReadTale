const {src, dest, watch, parallel, series} = require('gulp');


const server = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cssimport = require('gulp-cssimport');
const sourcemaps = require('gulp-sourcemaps');

function startServer() {
    server.init({
        server: {
            baseDir: 'dist/'
        },
        notify: false
    })
}

function styles() {
    return src(['app/scss/variables.scss', 'app/scss/reboot.scss' , 'app/scss/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(prefixer({
            overrideBrowserslist: ['last 5 version'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css')) 
        .pipe(server.stream())
}


function scripts() {
    return src(['app/js/libs/**/*.js', 'app/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix: '.min',
            dirname: ''
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/js/'))
}


function html() {
    return src('app/*.html')
        .pipe(sourcemaps.init())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/'))
}


function images() {
    return src( 'app/images/**/*.+(jpg|svg|png)')
    .pipe(dest('dist/images'))
}


function watcher() {
    watch(['app/*.html'], html).on('change', server.reload);
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js'], scripts).on('change', server.reload);
    watch(['app/images/**/*.+(jpg|svg|png)'], images).on('change', server.reload);
}


exports.default = parallel(startServer, watcher, html, styles, scripts);