gulp-jscs-html-reporter
====

Simple generator of HTML report for gulp-jssc that writes its output to a html file which looks pretty

> as of now, this gulp-plugin is not compat with [gulp-jscs](https://github.com/jscs-dev/gulp-jscs), because it is not support custom reporter yet
> you can use [gulp-jscs-with-reporter](https://github.com/knightli/gulp-jscs-with-reporter) instead

## Installation
```
npm install gulp-jscs-html-reporter --save
```

## Usage
```
var gulp = require('gulp');
var jscs = require('gulp-jscs-with-reporter');
var jscsReporter = require('gulp-jscs-html-reporter');
var jscsConfig = JSON.parse(fs.readFileSync('.jscsrc','utf-8'))

gulp.task('lint', function () {

  return gulp.src('./lib/**/*.js')
    .pipe(jscs(jscsConfig))
    .pipe(jscs.reporter('inline'))
    .pipe(jscs.reporter(jscsReporter, {
      filename: __dirname + '/jscs-output.ignore.html'
    }));
});
```

## Options

Plugin options:

Type: filename Default: "jscs-default-output.html"

## output html
![alt text](./screenshot.png 'JSCS HTML Reporter output')
