var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')

gulp.task('bundle', function () {
  return browserify({
    extensions: ['.js', '.jsx'],
    entries: './app/index.js'
  })
    .transform(babelify.configure({
      ignore: /(bower_components)|(node_modules)/
    }))
    .bundle()
    .on('error', function (err) { console.log('Error : ' + err.message) })
    .pipe(source('index_bundle.js'))
    .pipe(gulp.dest('public'))
})
