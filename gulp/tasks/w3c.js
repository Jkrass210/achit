// import { htmlValidator } from 'gulp-w3c-html-validator';
var htmlValidator = require("gulp-w3c-html-validator");

module.exports = function() {
    //  $.gulp.task('w3c', function() {
	// 	return $.gulp.src('build/*.html')
    //      .pipe(htmlhint())
    //   });

	$.gulp.task('w3c', function() {
		return $.gulp.src('build/*.html')
			.pipe(htmlValidator.analyzer())
			.pipe(htmlValidator.reporter())
	});
}