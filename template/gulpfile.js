var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');


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

    watch(['./src/config.json', './src/scripts/[^bower]*/**/*.js', './src/scripts/*.js', './src/index.html', './src/views/**/*.html', './src/images/**/*.*'], browserSync.reload);

    return browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        startPath: '/src#home'
    });

    // return browserSync.init({
    //     proxy: "example.com"
    // });

});

// 开启服务
gulp.task('default', gulp.series('browser'), function (callback) {
    callback();
});
