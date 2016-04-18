var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var requirejsOptimize = require('gulp-requirejs-optimize');


// compass
gulp.task('compass', function () {

    return gulp.src('./src/sass/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './src/css',
            sass: './src/sass',
        }))
        .on('error', function (error) {
            this.emit('end');
            console.log(error);
        })
        .pipe(browserSync.stream());
});

// browser sync
gulp.task('browser', function () {


    watch('./src/sass/**/*.scss', gulp.series('compass'));

    watch(['./src/scripts/[^bower]*/**/*.js', './src/scripts/*.js', './src/index.html', './src/views/**/*.html', './src/images/**/*.*'], browserSync.reload);

    return browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        startPath: '/src#home'
        // proxy: "qsq.com/shark/src#home"
    });
});

// 开启服务
gulp.task('default', gulp.series('browser'), function (callback) {
    callback();
});


gulp.task('build', function () {
    return gulp.src('src/scripts/main.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('dist'));
});