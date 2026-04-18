module.exports = function () {
	$.gulp.task('source', function () {
		return $.gulp.src('src/static/**/*.{mp3,mp4,webm,mpg,ico}')
			.pipe($.gulp.dest('build'));
	});
}