/* gulp dependencies */
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCSS = require('gulp-minify-css');
var lessDependents = require('gulp-less-dependents');
var clean = require('gulp-clean');
var bower = require('gulp-bower');
var concat_vendor = require('gulp-concat-vendor');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');

/* path def */
var path = {
    HTML: [
        'src/.htaccess',
        'src/*.html',
        'src/views/**/*.html',
        'src/views/*.html',
        'src/partials/**/*.html',
        'src/partials/*.html',
        'src/templates/**/*.html',
        'src/templates/*.html'
    ],
    BOWER: [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    ],
    LIB: [
        'src/lib/*.js',
        'src/lib/**/*.js'
    ],
    JS: [
        'src/js/*.js',
        'src/js/**/*.js'
    ],
    CSS: [
        'src/css/*.css',
        'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
    ],
    LESS: [
        'src/less/style.less'
    ],
    LESS_ALL: [
        'src/less/*.less'
    ],
    IMG: [
        'src/img/**',
        'src/assets/**'
    ],
    VENDOR: [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js'
    ],
    DIST: './dist'
};

/* spin up distribution server */
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 4005
    });
});

/* clean up dist dir */
gulp.task('clean', function () {
    return gulp.src('./dist', {
            force: true
        })
        .pipe(clean());
});

/* jslint for debugging */
gulp.task('lint', function () {
    return gulp.src(path.JS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

/* move css */
gulp.task('css', function () {
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DIST + '/css'));
});

/* compile less */
gulp.task('less', function () {
    gulp.src(path.LESS)
        .pipe(lessDependents())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.DIST + '/css'));
});

/* concat and compress app scripts */
gulp.task('js', function () {
    gulp.src(path.JS)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DIST + '/js'));
});

/* concat and compress app scripts */
gulp.task('js-ug', function () {
    gulp.src(path.JS)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({
            mangle: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DIST + '/js'));
});

/* concat vendor dependencies */
gulp.task('vendor', function () {
    gulp.src(path.VENDOR)
        .pipe(concat('vendor.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(path.DIST + '/js'));
});

/* copy over markups */
gulp.task('bower', function () {
    gulp.src(path.BOWER, {
            base: 'bower_components'
        })
        .pipe(gulp.dest(path.DIST + '/js'));
});

/* copy over markups */
gulp.task('lib', function () {
    gulp.src(path.LIB)
        .pipe(gulp.dest(path.DIST + '/js'));
});

/* copy over markups */
gulp.task('html', function () {
    gulp.src(path.HTML, {
            base: 'src'
        })
        .pipe(gulp.dest(path.DIST));
});

/* compress images */
gulp.task('img', function () {
    gulp.src(path.IMG, {
            base: 'src'
        })
        .pipe(gulp.dest(path.DIST));
});

/* watch all changes */
gulp.task('watch', function () {
    gulp.watch(path.LESS_ALL, ['less']);
    gulp.watch(path.VENDOR, ['vendor']);
    gulp.watch(path.JS, ['lint', 'js']);
    gulp.watch(path.CSS, ['css']);
    gulp.watch(path.LIB, ['lib']);
    gulp.watch(path.HTML, ['html']);
    gulp.watch(path.IMG, ['img']);
});

gulp.task("build", function (callback) {
    // process.env.NODE_ENV = "production";

    runSequence('clean', 'lint', 'css', 'less', 'lib', 'bower', 'vendor', 'js', 'html', 'img', 'connect', 'watch', callback);
});

gulp.task("build-min", function (callback) {
    // process.env.NODE_ENV = "production";

    runSequence('clean', 'lint', 'css', 'less', 'lib', 'bower', 'vendor', 'js-ug', 'html', 'img', callback);
});