'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var ngConstant = require('gulp-ng-constant');
var print = require('gulp-print');

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

var inProduction = false
//(process.env.NODE_ENV == 'production');
gulp.task('constant', function () {
  gulp.src('app/constant.json')
    .pipe(gulpif(inProduction,
      ngConstant({
        name: 'platform.constant',
        constants: { apiUrl: process.env.API_URL },
        wrap: 'amd',
      }),
      ngConstant())
    )
    .pipe(gulp.dest('dist'));
});
