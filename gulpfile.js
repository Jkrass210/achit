'use strict';

/* Plugins
********************
gulp-load-plugins
gulp-pug
gulp-sass
gulp-csso
gulp-notify
gulp-autoprefixer
gulp-sourcemaps
gulp-browserSync
gulp-concat

*/

// const sass = require('gulp-sass')(require('sass'));

global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('default',$.gulp.series(
    $.gulp.parallel('pug','sass','scripts:lib','scripts','img','fonts','source'),
    $.gulp.parallel('watch','serve')
));

$.gulp.task('build',$.gulp.series(
	$.gulp.parallel('clean'),
    $.gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts', 'img', 'fonts', 'source')
));