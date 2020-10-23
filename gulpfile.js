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
    jsEducationPath: "source/js/education/**/*.js",
    jsWorkPath: "source/js/work/**/*.js",
    jsProjectPath: "source/js/project/**/*.js",
    jsGeneralPath: "source/js/main/**/*.js",
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
function jsEducationTask() {
    return src(files.jsEducationPath)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat('education.js')) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write(".maps"))
        .pipe(dest('publish/js') 
    );
}

//concat and minify js files and use babel for backwards compatible versions of js - send to pub folder
function jsWorkTask() {
    return src(files.jsWorkPath)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat('work.js')) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write(".maps"))
        .pipe(dest('publish/js') 
    );
}

//concat and minify js files and use babel for backwards compatible versions of js - send to pub folder
function jsProjectTask() {
    return src(files.jsProjectPath)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat('project.js')) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write(".maps"))
        .pipe(dest('publish/js') 
    );
}

//concat and minify js files and use babel for backwards compatible versions of js - send to pub folder
function jsGeneralTask() {
    return src(files.jsGeneralPath)
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
        watch([files.jsEducationPath], jsEducationTask).on('change', browserSync.reload);
        watch([files.jsWorkPath], jsWorkTask).on('change', browserSync.reload);
        watch([files.jsProjectPath], jsProjectTask).on('change', browserSync.reload);
        watch([files.jsGeneralPath], jsGeneralTask).on('change', browserSync.reload);
        watch([files.sassPath], sassTask).on('change', browserSync.reload);
        watch([files.imagesPath], imageTask).on('change', browserSync.reload);
}

//export public tasks
exports.clean = clean;
exports.copyHTML = copyHTML;
exports.sassTask = sassTask;
exports.jsEducationTask  = jsEducationTask;
exports.jsWorkTask  = jsWorkTask;
exports.jsProjectTask  = jsProjectTask;
exports.jsGeneralTask  = jsGeneralTask;
exports.watchTask = watchTask;
exports.imageTask = imageTask;

//default tasks
exports.default = series (
    clean,
    parallel(copyHTML, jsEducationTask, jsProjectTask, jsWorkTask, jsGeneralTask, sassTask, imageTask),
    watchTask
);