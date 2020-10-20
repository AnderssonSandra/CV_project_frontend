//require methods
const {src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const uglify = require ("gulp-uglify-es").default; 
const browserSync = require('browser-sync').create();
const del = require("del");
const gulpSass = require('gulp-sass');
gulpSass.complier = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require ("gulp-imagemin");
const babel = require("gulp-babel");


//paths
const files = {
    htmlPath: "source/**/*.html",
    jsPath: "source/**/*.js",
    sassPath: "source/**/*.scss",
    imagesPath: "source/**/*.{gif,png,jpg,svg}",
}

//remove pub folder
function clean() {
    return del(['publish/*']);
 }

// send HTML files to pub folder
function copyHTML () {
    return src(files.htmlPath)
        .pipe(dest('publish')
    );
}

//concat and minify js files and use babel for backwards compatible versions of js - send to pub folder
function jsTask() {
    return src(files.jsPath)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat('main.js')) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write(".maps"))
        .pipe(dest('publish/js') 
    );
}

//concat and minify sass files- send to pub folder
function sassTask () {
    return src (files.sassPath)
    .pipe(concat('styles.css')) 
    .pipe(sourcemaps.init())
    .pipe(gulpSass({outputStyle: 'compressed'}).on('error', gulpSass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('publish/css')
    );
}

//minify images- send to pub folder
function imageTask() {
    return src(files.imagesPath)
    .pipe(imagemin())
    .pipe(dest('publish/')
    );
}

//watch changes and update browser
function watchTask() {
    browserSync.init({
        injectChanges: false,
        server: {
            baseDir: 'publish/'
        }
    });
        watch([files.htmlPath], copyHTML).on('change', browserSync.reload);
        watch([files.jsPath], jsTask).on('change', browserSync.reload);
        watch([files.sassPath], sassTask).on('change', browserSync.reload);
        watch([files.imagesPath], imageTask).on('change', browserSync.reload);
}

//export public tasks
exports.clean = clean;
exports.copyHTML = copyHTML;
exports.sassTask = sassTask;
exports.jsTask  = jsTask;
exports.watchTask = watchTask;
exports.imageTask = imageTask;

//default tasks
exports.default = series (
    clean,
    parallel(copyHTML, jsTask, sassTask, imageTask),
    watchTask
);