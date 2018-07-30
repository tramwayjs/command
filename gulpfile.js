"use strict";

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const DEV_DIRECTORY = 'dev/**/*.js';
const DIST_DIRECTORY = 'dist';

gulp.task('build', function() {
    return gulp
        .src(DEV_DIRECTORY)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('watch', ['build'], function(){
    gulp.watch(DEV_DIRECTORY, ['build']);
});

gulp.task('distribute', function() {
    return gulp
        .src(DEV_DIRECTORY)
        .pipe(babel())
        .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('default', ['watch']);