const gulp = require('gulp');
const stylus = require('gulp-stylus');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-minify-css');
const copy = require('gulp-copy');
const clean = require('gulp-clean');
const exec = require('child_process').exec;
const runSequence = require('run-sequence');

gulp.task('stylus', function () {
  return gulp.src(['./static/css/*.styl', './static/css/default.css'])
    .pipe(stylus({
      'include-css': true
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./static_dist/css/'));
});

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  return browserify({
    entries: [
      './static/js/index.js'
    ],
    debug: true
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./static_dist/js/'));
});

gulp.task('images', function() {
  return gulp.src('./static/images/*')
    .pipe(copy('./static_dist/images', { prefix: 2 }))
});

gulp.task('clean', function() {
  return gulp.src('static_dist', { read: false })
    .pipe(clean());
});

gulp.task('watch:js', function() {
  return gulp.watch('./static/js/**/*', ['javascript']);
});

gulp.task('watch:stylus', function() {
  return gulp.watch('./static/css/**/*', ['stylus']);
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['javascript', 'stylus', 'images'],
    callback
  );
});

gulp.task('watch', ['build', 'watch:js', 'watch:stylus'], function() {})