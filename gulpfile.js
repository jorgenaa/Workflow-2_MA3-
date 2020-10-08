const gulp = require('gulp');
const { src, dest } = require('gulp');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

 function css() {
	return src('less/**/*.less')
		.pipe(less())
		.pipe(dest('css'))
		.pipe(browserSync.stream())
}

function imgSquash() {
	return gulp.src('./img/*')
		.pipe(imagemin({ progressive: true, optimizationLevel: 10 }))
		.pipe(gulp.dest('./minified/images'))
		.pipe(browserSync.stream())
}

 function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		}
	});
	gulp.watch('./less/**/*.less', css);
	gulp.watch('./img/*', imgSquash);
	gulp.watch('./*.html').on('change', browserSync.reload);
}


exports.watch = watch;