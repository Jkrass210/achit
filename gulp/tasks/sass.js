const purify = require("purify-css");
const bulkSass = require('gulp-sass-bulk-import');

const sass = require('gulp-sass')(require('sass'));

module.exports = function () {
    $.gulp.task('sass', function () {
        return $.gulp.src('src/static/scss/*.scss')
            .pipe($.gp.sourcemaps.init())
            .on("error", $.gp.notify.onError({
                message: "Error: <%= error.message %>",
                title: "style"
            }))
            .pipe($.gp.csso())
			.pipe(bulkSass())
            .pipe(sass({
            	outputStyle: 'expanded'
            }))
            .pipe($.gp.autoprefixer({
                browsers: ['last 10 versions']
            }))
			// .pipe(purify(content, css, options))
            // .pipe($.gp.sourcemaps.write('./'))
            .pipe($.gulp.dest('build/css/'))
            // Минифицированная версия
            .pipe(sass({
            	outputStyle: 'compressed'
            }))
            // .pipe($.gp.rename('libs.min.css'))
			.pipe($.gp.rename(function(file) {
				file.basename = file.basename + '.min'
			}))
            .pipe($.gp.sourcemaps.write('./'))
            .pipe($.gulp.dest('build/css/'))
            .on('end', $.bs.reload);

        // .pipe($.bs.reload({
        //     stream:true
        // }));

		// only page styles

		// return $.gulp.src('src/static/css/main.scss')
        //     .pipe($.gp.sourcemaps.init())
        //     .on("error", $.gp.notify.onError({
        //         message: "Error: <%= error.message %>",
        //         title: "style"
        //     }))
        //     .pipe($.gp.csso())
        //     .pipe($.gp.sass({ outputStyle: 'expanded' }))
        //     .pipe($.gp.autoprefixer({
        //         browsers: ['last 10 versions']
        //     }))
		// 	// .pipe(purify(content, css, options))
        //     // .pipe($.gp.sourcemaps.write('./'))
        //     .pipe($.gulp.dest('build/css/'))
        //     // Минифицированная версия
        //     .pipe($.gp.sass({ outputStyle: 'compressed' }))
        //     .pipe($.gp.rename('main.min.css'))
        //     .pipe($.gp.sourcemaps.write('./'))
        //     .pipe($.gulp.dest('build/css/'))
        //     .on('end', $.bs.reload);
    });
}
