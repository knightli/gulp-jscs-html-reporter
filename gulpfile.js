var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs-with-reporter');
var jscsReporter = require('./index');

function rcjson(filename) {
  var json;
  try {
    json = eval("("+fs.readFileSync(path.join(__dirname, filename),'utf-8')+")");
  } catch(e) {
    console.error('rc parse error! rc file:'+filename);
  }
  return json;
}


var jsHintConfig = rcjson('.jshintrc');
var jsCsConfig = rcjson('.jscsrc');

gulp.task('lint', function () {

  return gulp.src(['./lib/**/*.{js,jsx}','!./assets/bundle.js'])
    .pipe(jshint(jsHintConfig))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: __dirname + '/jshint-output.ignore.html'
    }))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs(jsCsConfig))
    .pipe(jscs.reporter('inline'))
    .pipe(jscs.reporter(jscsReporter, {
      filename: __dirname + '/jscs-output.ignore.html'
    }));
});


