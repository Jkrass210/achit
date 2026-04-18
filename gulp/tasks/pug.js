var htmlbeautify = require('gulp-html-beautify');

module.exports = function() {
    $.gulp.task('pug', function() {
        return $.gulp.src('src/pug/pages/*.pug')
            .pipe($.gp.pug({
                pretty: true
            }))
			.pipe(htmlbeautify({
				indentSize: 2
			}))
            .pipe($.gulp.dest('build'))
            .on('end', $.bs.reload);
    });
}
