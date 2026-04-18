var imagemin     = require('gulp-imagemin'),
    imgCompress  = require('imagemin-jpeg-recompress');

module.exports = function() {
    $.gulp.task('img', function() {
        return $.gulp.src('src/static/img/**/*.{png,jpg,jpeg,gif,svg,webp,ico}')
			// .pipe(imagemin([
			// 	imgCompress({
			// 	loops: 4,
			// 	min: 40,
			// 	max: 60,
			// 	quality: 'high'
			// 	}),
			// 	imagemin.gifsicle(),
			// 	imagemin.optipng(),
			// 	imagemin.svgo()
			// ]))
            .pipe($.gulp.dest('build/img'));
	});
}
