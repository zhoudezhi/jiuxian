/**
 * Created by zhoudezhi on 2017/7/23.
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var transport = require("gulp-seajs-transport");
var gulpSequence = require('gulp-sequence')

gulp.task("clean", function () {
    return gulp.src('build')
        .pipe(clean())
});

gulp.task('copy:one', function () {
    return gulp.src('static/**/*')
        .pipe(gulp.dest('build'))
});
gulp.task('copy:two', function () {
    return gulp.src('build/js/app/src/*.js')
        .pipe(gulp.dest('build/js/app/dist'))
});

gulp.task("transport", function () {
    return gulp.src(['build/js/common/*.js', 'build/js/app/dist/*.js'], {base: "build"})
        .pipe(transport({
            idleading: "../"
        })) //此时seajs模块id为=>/static/def/ggg
        .pipe(gulp.dest("build"));
});

gulp.task('copy:three', function () {
    return gulp.src('build/js/app/dist/*.js')
        .pipe(gulp.dest('static/js/app/dist'))
});

gulp.task('default', gulpSequence('clean', 'copy:one', 'copy:two','transport','copy:three'));