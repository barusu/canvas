/**
 * @author shiro https://github.com/barusu
 */
const {src, dest} = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

const rootpath = '**/demo/';

function compileSass() {
  return src(rootpath + 'scss/!(_)*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(''));
}


    // cssnano = require('gulp-cssnano'),
    // ,
    // notify = require('gulp-notify'),
    // map = require('gulp-sourcemaps'),
    
    // base64 = require('gulp-base64');
// var rootpath = '**/2018-11-21/';
// var rootpath = '**/ali/';

// gulp.task('sass', function() {
//   return gulp.src(rootpath + 'scss/!(_)*.scss')
//     .pipe(map.init())
//     .pipe(sass({ style: 'expanded' }))
//     .pipe(autoprefixer({browsers:['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
//     .pipe(base64({extensions: ['png'], maxImageSize: 20480, debug: false}))
//     .pipe(rename(function (path) {
//       path.dirname = path.dirname.replace('/scss', '/css');
//     }))
//     .pipe(gulp.dest(''))
//     .pipe(cssnano())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(map.write('/'))
//     .pipe(gulp.dest(''))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// gulp.task('script', function() {
//   return gulp.src(rootpath + 'script/!(_)*.js')
//     .pipe(map.init())
//     .pipe(rename(function (path) {
//       path.dirname = path.dirname.replace('/script', '/js');
//     }))
//     .pipe(gulp.dest(''))
//     .pipe(uglify())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(map.write('/'))
//     .pipe(gulp.dest(''))
//     .pipe(notify({ message: 'Scripts task complete' }));
// });

// gulp.task('watch', function() {
//   gulp.watch(rootpath + 'scss/*.scss', ['sass']);
//   gulp.watch(rootpath + 'script/*.js', ['script']);
// });

// gulp.task('default', function() {
//   gulp.start('sass', 'script');
// });









