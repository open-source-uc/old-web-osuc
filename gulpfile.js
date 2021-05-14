var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');

gulp.task('default', function () {
  return new Promise(function (resolve, reject) {
    gulp.src('src/index.html')
    .pipe(htmlreplace({
        'css': '',
        'js': ''
    }))
    .pipe(gulp.dest('dist/'));
    console.log("Tags removed!");
    resolve();
  });
});

exports.build = gulp.series('default');