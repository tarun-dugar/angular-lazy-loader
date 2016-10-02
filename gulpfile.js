var gulp = require('gulp');
var rename = require('gulp-rename');
var minifyJS = require('gulp-uglify');

gulp.task('default', function() {
	gulp.src('./src/angular-lazy-loader.js')
		.pipe(minifyJS())
		.pipe(gulp.dest('./dist/'))
		.pipe(rename('index.js'))
		.pipe(gulp.dest('./'));
});