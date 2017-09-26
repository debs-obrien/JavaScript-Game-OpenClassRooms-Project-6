const gulp  = require('gulp');
const    gutil = require('gulp-util');
const concat = require('gulp-concat');
const    uglify = require('gulp-uglify');
const    cleanCSS = require('gulp-clean-css');
const   rename = require('gulp-rename');
const  maps = require('gulp-sourcemaps');
const   useref = require('gulp-useref');
const   imagemin = require('gulp-imagemin');
const   cache = require('gulp-cache');
const   replace = require('gulp-replace');

const paths = {
    src: '',
    dist: 'dist'
};
/* ---------------------------------------------------------------------------------------
Get js files, create sourcemap, concatanate to global.js
minify global.js and rename it all.min.js and put in dist/scripts reload if necessary
---------------------------------------------------------------------------------------*/
gulp.task("concatJS", function(){
    return gulp.src(`${paths.src}/js/*.js`)
        .pipe(maps.init())
        .pipe(concat('global.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(`${paths.src}/js`))
});
gulp.task('scripts', ['concatJS'], function(){
    return gulp.src(`${paths.src}/js/global.js`)
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest(`${paths.dist}/scripts`))
        .pipe(browserSync.stream());
});