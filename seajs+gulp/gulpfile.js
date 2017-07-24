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

//清除build临时目录
gulp.task("clean", function () {
    return gulp.src('build')
        .pipe(clean())
});

//复制所有到build
gulp.task('copy:one', function () {
    return gulp.src('static/**/*')
        .pipe(gulp.dest('build'))
});

//复制src到dist
gulp.task('copy:two', function () {
    return gulp.src('build/js/app/src/*.js')
        .pipe(gulp.dest('build/js/app/dist'))
});

//为匿名函数添加id
gulp.task("transport", function () {
    return gulp.src(['build/js/common/*.js', 'build/js/tpl/*.js', 'build/js/app/dist/*.js'], {base: "build"})
        .pipe(transport({
            idleading: "../"
        })) //此时seajs模块id为=>../+文件路径
        .pipe(gulp.dest("build"));
});

//合并文件
gulp.task('concat:index', function () {
    return gulp.src(['build/js/app/dist/index.js', 'build/js/common/*.js', 'build/js/tpl/*.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('build/js/app/dist'));
});

//合并文件
gulp.task('concat:demo', function () {
    return gulp.src(['build/js/app/dist/demo.js', 'build/js/common/*.js', 'build/js/tpl/*.js'])
        .pipe(concat('demo.js'))
        .pipe(gulp.dest('build/js/app/dist'));
});

//压缩合并后的js
gulp.task('uglify', function () {
    return gulp.src('build/js/app/dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js/app/dist'));
});

//压缩css
gulp.task('cssmin', function () {
    gulp.src('build/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'));
});

//负责构建后的js到开发目录
gulp.task('copy:three', function () {
    return gulp.src('build/js/app/dist/*.js')
        .pipe(gulp.dest('static/js/app/dist'))
});

gulp.task('default', gulpSequence('clean', 'copy:one', 'copy:two', 'transport', 'concat:index', 'concat:demo', 'uglify','cssmin','copy:three'));