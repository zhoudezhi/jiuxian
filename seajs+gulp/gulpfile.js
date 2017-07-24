/**
 * Created by zhoudezhi on 2017/7/23.
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var transport = require("gulp-seajs-transport");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var gulpSequence = require('gulp-sequence');


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
    return gulp.src(['build/js/common/*.js', 'build/js/tpl/*.js', 'build/js/app/dist/*.js'], {base: "build"})
        .pipe(transport({
            idleading: "../"
        })) //此时seajs模块id为=>../+文件路径
        .pipe(gulp.dest("build"));
});

gulp.task('concat:index', function () {
    return gulp.src(['build/js/app/dist/index.js', 'build/js/common/*.js', 'build/js/tpl/*.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('build/js/app/dist'));
});

gulp.task('concat:demo', function () {
    return gulp.src(['build/js/app/dist/demo.js', 'build/js/common/*.js', 'build/js/tpl/*.js'])
        .pipe(concat('demo.js'))
        .pipe(gulp.dest('build/js/app/dist'));
});

gulp.task('uglify', function () {
    return gulp.src('build/js/app/dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js/app/dist'));
});

gulp.task('cssmin', function () {
    gulp.src('build/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'));
});

gulp.task('copy:three', function () {
    return gulp.src('build/js/app/dist/*.js')
        .pipe(gulp.dest('static/js/app/dist'))
});


gulp.task('default', gulpSequence('clean', 'copy:one', 'copy:two', 'transport', 'concat:index', 'concat:demo', 'uglify','cssmin','copy:three'));