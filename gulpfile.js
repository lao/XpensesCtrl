var gulp = require('gulp');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
    return gulp
        .src('client_src/css/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulpif(argv.production, csso()))
        .pipe(gulp.dest('public/css'));
});

gulp.task('angular', function() {
    return gulp
        .src([
            'client_src/app.js',
            'client_src/controllers/*.js',
            'client_src/directives/*.js',
            'client_src/services/*.js'
        ])
        .pipe(concat('application.js'))
        .pipe(ngAnnotate())
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest('public/js'));
});

gulp.task('templates', function() {
    return gulp
        .src('client_src/templates/**/*.html')
        .pipe(templateCache({ root: 'templates', module: 'XpensesCtrlApp' }))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest('public/js'));
});

gulp.task('vendor', function() {
    return gulp
        .src('client_src/libs/vendor/*.js')
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest('public/js/lib'));
});

gulp.task('watch', function() {
    gulp.watch('client_src/css/**/*.scss', ['sass']);
    gulp.watch('client_src/templates/**/*.html', ['templates']);
    gulp.watch('client_src/**/*.js', ['angular']);
});

gulp.task('build', ['sass', 'angular', 'vendor', 'templates']);
gulp.task('default', ['build', 'watch']);
