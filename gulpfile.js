var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function() {
  gulp.src('src/*.js').pipe(gulp.dest('dist'));

  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename('marvel-random.min.js'))
    .pipe(gulp.dest('dist'));

});

gulp.task('deploy', function () {
  gulp.src('demo/**/*').pipe(ghPages());
});