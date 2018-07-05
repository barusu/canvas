/**
 * @author shiro https://github.com/barusu
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    map = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    base64 = require('gulp-base64');
var rootpath = '**/2018-07-05/';

gulp.task('sass', function() {
  return gulp.src(rootpath + 'scss/!(_)*.scss')
    .pipe(map.init())
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer({browsers:['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
    .pipe(base64({extensions: ['png'], maxImageSize: 20480, debug: false}))
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('/scss', '/css');
    }))
    .pipe(map.write('/'))
    .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('script', function() {
  return gulp.src(rootpath + 'script/!(_)*.js')
    .pipe(map.init())
    .pipe(babel({ presets: ['es2015']}))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('/script', '/js');
    }))
    .pipe(map.write('/'))
    .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(rootpath + 'scss/*.scss', ['sass']);
  gulp.watch(rootpath + 'script/*.js', ['script']);
});

gulp.task('default', function() {
  gulp.start('sass', 'script');
});









