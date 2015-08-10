'use strict';

var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var nodemon = require('gulp-nodemon');
// var buffer = require('vinyl-buffer');
// var uglify = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');
// var gutil = require('gulp-util');

gulp.task('build-clean', function() {
  del([
    './public/bundle.js',
    './public/main.css'
  ]);
});

gulp.task('build-scripts', ['build-clean'], function() {
  return browserify({
    entries: ['./client/scripts/app.js']
  })
  .bundle()
  .pipe(source('bundle.js'))
  // .pipe(buffer())
      // Add transformation tasks to the pipeline here.
      // .pipe(uglify())
      // .on('error', gutil.log)
  // .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/'));
});

gulp.task('build-styles', ['build-clean'], function() {
  return gulp.src('./client/styles/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['build-scripts', 'build-styles']);

gulp.task('watch', function() {
  gulp.watch('./client/styles/**.styl', ['build-styles']);
  gulp.watch('./client/scripts/**.js', ['build-scripts']);
});

gulp.task('server', ['build', 'watch'], function() {
  return nodemon({
    script: 'server.js'
  })
  .on('restart', function() {
    console.log('Nodemon restarted the server!');
  });
});

gulp.task('default', ['server']);
