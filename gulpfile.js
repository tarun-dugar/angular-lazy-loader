var gulp = require('gulp');

var minifyJS = require('gulp-uglify');

gulp.task('compress-js', function() {
	gulp.src('./src/angular-lazy-loader.js')
		.pipe(minifyJS())
		.pipe(gulp.dest('./dist'))
});