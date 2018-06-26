var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');

// minify js
gulp.task('uglify', function() {
    gulp.src('js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

// minify css
gulp.task('clean_css', function() {
    gulp.src('css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('build'));
});

// clean dist directory
gulp.task('clean', function() {
    return del.sync('build');
});

// merge and minify css and js files
gulp.task('css_js', function () {
    return gulp
        .src('views/**/*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('build'));
});

// default command
gulp.task('default', function(callback){
    runSequence('clean', ['uglify', 'clean_css'],
        callback
    );
});

// gulp watch
gulp.task('watch', function() {
    gulp.watch('css/**/*.css', ['clean_css']);
});
