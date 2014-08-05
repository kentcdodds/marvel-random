var gulp = require('gulp');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var deploy = require('gulp-gh-pages');

gulp.task('build', function() {
  gulp.src('src/*.js').pipe(gulp.dest('dist'));

  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename('marvel-random.min.js'))
    .pipe(gulp.dest('dist'));

});

gulp.task('deploy', function () {
  gulp.src('./demo/**/*')
    .pipe(deploy())
    .pipe(gulp.dest('.tmp'));
});