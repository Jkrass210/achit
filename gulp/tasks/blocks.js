module.exports = function () {
	$.gulp.task('blocks', function () {
		console.log($.gulp.src('src/pug/pages/*.pug'));
	});
}