module.exports = function () {
    $.gulp.task('clean', function () {
        return $.gulp.src('build', {read: false})
        	.pipe($.gp.clean());
    });
}