'use strict';
var JSX = require('node-jsx').install({
  extension: '.jsx'
});

var React = require('react'),
  fs = require('fs'),
  Reporter = require('../components/Reporter.react.jsx');

var styleContent = fs.readFileSync(__dirname + '/../assets/style.css', 'utf-8');
var scriptContent = fs.readFileSync(__dirname + '/../assets/bundle.js', 'utf-8');

var header = [
  '<!DOCTYPE html><html>',
  '<head><meta charset="utf-8"><title>JSCS HTML Reporter</title>',
  '<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css">',
  '<style>',
  styleContent,
  '</style>',
  '</head>',
  '<body style="font-family:monospace;">',
  '<div id="wrapper">',
  '<div id="report-app">',
  '<div class="top-bar"><a href="javascript:void(0)">收起全部</a></div>',
  '<div id="reporters">',
  ].join('\r\n');


var footer = [
  '</div>',//end of `reporters`
  '</div>',//end of `report-app`
  '</div>',//end of `wrapper`
  '<script>'+scriptContent+'</script>',
  '</body>',
  '</html>'
  ].join('\r\n');

var _fileWritter;

function getWritter(filename) {
  if(!_fileWritter) {
    _fileWritter = prepareFileWritter(filename);
  }
  return _fileWritter;
}

function prepareFileWritter(filename) {

  fs.writeFileSync(filename, header + footer, 'utf-8');

  return {
    write: function(content){
      var now = fs.readFileSync(filename ,'utf-8');
      var new_content = now.replace(footer, content);
      new_content += footer;
      fs.writeFileSync(filename, new_content);
    }
  };
}

function getLines(linesAll, line) {
  var lineNumber = line - 1;
  var i;
  var linesAround = 2;
  var lines = [
    {
      code: linesAll[lineNumber],
      line: lineNumber
    }
  ];

  i = lineNumber - 1;
  while (i >= 0 && i >= (lineNumber - linesAround)) {
    lines.unshift({
      code: linesAll[i],
      line: i
    });
    i--;
  }

  i = lineNumber + 1;
  while (i < linesAll.length && i <= (lineNumber + linesAround)) {
    lines.push({
      code: linesAll[i],
      line: i
    });
    i++;
  }
  return lines;
}

function getErrorSets(errorsCollection) {
  var errsets = [];
  errorsCollection.forEach(function(errors) {
    var errset = {};
    errset.filename = errors.getFilename();
    var errorList = [];
    var linesAll = errors._file.getLines();
    errors.getErrorList().forEach(function(error) {
      errorList.push({
        line: error.line,
        column: error.column + 1,
        message: error.message,
        lines: getLines(linesAll, error.line),
        severity: 'error',
        source: "jscs"
      });
    });
    errset.errorList = errorList;
    errsets.push(errset);
  });
  return errsets;
}

function genStateScript(state) {
  return '<script class="stateScript" type="application/json">' + JSON.stringify(state) + '</script>';
}

/**
 * @param {Errors[]} errorsCollection
 */
module.exports = function( errorsCollection, reporterOptions ) {

  reporterOptions = reporterOptions || {};
  var filename = reporterOptions.filename || './jscs-output-default.html';

  var errsets = getErrorSets(errorsCollection);
  if(errsets.length && errsets[0].errorList.length){
    var state = {
      errsets: getErrorSets(errorsCollection),
      options: reporterOptions
    };

    var content, stateScript, markup;

    try{
      var ReporterFactory = React.createFactory(Reporter);
      markup = React.renderToString(
        ReporterFactory(state)
      );
    }catch(e){
      console.trace(e);
    }

    stateScript = genStateScript(state);

    content = markup + stateScript;

    getWritter(filename).write(content);
  }
};

// Expose path to reporter so it can be configured in e.g. grunt-jscs-checker
module.exports.path = __dirname;
