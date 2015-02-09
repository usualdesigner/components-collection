var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('./src/components-collection.js')
        .pipe(gulp.dest('./src'))
        .pipe(rename('components-collection.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src'));
});

gulp.task('default', function () {
    gulp.run('minify');

    gulp.watch("./src/components-collection.js", function (event) {
        gulp.run('minify');
    });
});