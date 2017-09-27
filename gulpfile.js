const gulp  = require('gulp');
const    gutil = require('gulp-util');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const    uglify = require('gulp-uglify');
const    cleanCSS = require('gulp-clean-css');
const   rename = require('gulp-rename');
const  maps = require('gulp-sourcemaps');
const   useref = require('gulp-useref');
const   imagemin = require('gulp-imagemin');
const   cache = require('gulp-cache');
const   replace = require('gulp-replace');
const del = require ('del');
const runSequence = require('run-sequence');
const gulpSequence = require('gulp-sequence');

const paths = {
    src: '',
    dist: 'dist'
};
/* ---------------------------------------------------------------------------------------
Get js files, create sourcemap, concatanate to global.js
minify global.js and rename it all.min.js and put in js folder
---------------------------------------------------------------------------------------*/
gulp.task("concatJS", function(){
    return gulp.src(["js/variables.js",
            "js/game.js",
            "js/players.js",
            "js/weapons.js",
            "js/loadGame.js",

            "js/app.js","js/gameOver.js"])

        .pipe(maps.init())
        .pipe(concat('global.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'))
});
gulp.task('scripts', ['concatJS'], function(){
    return gulp.src('js/global.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest(`${paths.dist}/scripts`))
});

/* ---------------------------------------------------------------------------------------
 get global.scss and create sourcemap save scss as css
 minify global.css and rename it all.min.css and put in dist/styles reload if necessary
 ---------------------------------------------------------------------------------------*/
gulp.task('styles',  function(){
    return gulp.src('css/styles.css')
        .pipe(cleanCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest(`${paths.dist}/styles`))
});

/* ---------------------------------------------------------------------------------------
 minifiy images using cache and add to folder called content in dist
 ---------------------------------------------------------------------------------------*/
gulp.task('images', function(){
    return gulp.src('src/*.+(png|jpg)')
        .pipe(cache(imagemin([
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ])))
        .pipe(gulp.dest(`${paths.dist}/src`));
});

/* ---------------------------------------------------------------------------------------
 changes the html to call the new minified css and js
 then replaces all references to the images folder with content folder
 add the html to the dist folder
 ---------------------------------------------------------------------------------------*/
gulp.task('html', function(){
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(replace('src/', 'src/'))
        .pipe(gulp.dest(paths.dist))
});

/* ---------------------------------------------------------------------------------------
delete everything in dist folder
 ---------------------------------------------------------------------------------------*/
gulp.task('clean', function(){
    return del('dist');
});

/* ---------------------------------------------------------------------------------------
 build for production first cleaning any old dist
 then run scripts, styles, images and icons
 finally run the html to change the routes of images and name of minfified files
 ---------------------------------------------------------------------------------------*/


gulp.task('build', ['clean'], (callback) => {
    runSequence('html', 'scripts', 'images', 'styles', callback);
});

/* ---------------------------------------------------------------------------------------
 by typing gulp run build
 ---------------------------------------------------------------------------------------*/

