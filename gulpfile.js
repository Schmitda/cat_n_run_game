var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var reload = browserSync.reload;
var ext_replace = require('gulp-ext-replace');

gulp.task('default', function () {
    gulp.watch('./dev_public/assets/sass/*.scss', ['build-css']);
    gulp.watch('./dev_public/assets/libs/gridle/sass/**/*.scss', ['gridleSass']);
    gulp.watch('./dev_public/app/*/css/*.scss', ['gridleComponentSass']);
});

gulp.task('build-css', function () {
    return gulp.src('./dev_public/assets/sass/*.scss')
        .pipe(ext_replace('.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dev_public/assets/css/'));
});

gulp.task('gridleSass', function () {
    return gulp.src("./dev_public/assets/libs/gridle/sass/**/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .on('error', onError)
        .pipe(rename({
            suffix: '.min'
        }))
        /*.pipe(gulp.dest('./public/css'))*/
        .pipe(gulp.dest('./dev_public/prod/css/'));
});

gulp.task('gridleComponentSass', function () {
    return gulp.src("./dev_public/app/*/css/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
     /*   .pipe(gulp.dest('./dev_public/app'))*/
        /*.pipe(gulp.dest('./dev_public/assets/css/'))*/
        .pipe(gulp.dest(function(file){
            console.log(file);
            return file.base
        }));
});

gulp.task('start', function(){
    browserSync.init({
        proxy: "http://localhost:55", // port of node server
        reloadDelay: 1000
    });

    gulp.watch(["./dev_public/**/*.js"], reload);
});

function onError(err) {
    console.log(err);
    this.emit('end');
}