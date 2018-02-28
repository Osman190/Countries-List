const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass', function () {
  return gulp.src('./src/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))

    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(`./src/*.sass`, ['sass']);
})

gulp.task('default', ['sass', 'watch']);