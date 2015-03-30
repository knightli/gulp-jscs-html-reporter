'use strict';

var writter = require('./writter');
var __log = function() {
  if (__log.debug) {
    console.log.apply(console,arguments);
  }
};

function getLines(linesAll, line) {
  var lineNumber = line - 1; //第1行错误,line为1,但从linesAll里找索引, 却应该是0
  var i;
  var linesAround = 2;
  var lines = [
    {
      code: linesAll[lineNumber],
      line: line
    }
  ];

  i = lineNumber - 1;
  while (i >= 0 && i >= (lineNumber - linesAround)) {
    lines.unshift({
      code: linesAll[i],
      line: i + 1
    });
    i--;
  }

  i = lineNumber + 1;
  while (i < linesAll.length && i <= (lineNumber + linesAround)) {
    lines.push({
      code: linesAll[i],
      line: i + 1
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

function handleAllCollection(errorsCollection, reporterOptions){

  var state = {
    fileCount: 0,
    errorCount: 0,
    options: reporterOptions
  };

  var errsets = getErrorSets(errorsCollection);

  state.reporters = errsets.map(function(errset) {
    state.fileCount++;
    if (errset.errorList && errset.errorList.length) {
      state.errorCount += errset.errorList.length;
    }
    return {
      errsets: [errset],
      options: reporterOptions
    };
  });

  writter.write(state);
}

function getopts(reporterOptions){
  reporterOptions = reporterOptions || {};
  reporterOptions.time = reporterOptions.time || new Date().getTime();
  reporterOptions.filename = reporterOptions.filename || './jscs-output-default.html';
  return reporterOptions;
}

/**
 * @param {Errors[]} errorsCollection
 */
var plugin = module.exports = function(errorsCollection, reporterOptions) {
  reporterOptions = getopts(reporterOptions);
  __log.debug = reporterOptions.debug;
  __log('errorsCollection');
  __log(errorsCollection);
};

plugin.beforeAll = function(reporterOptions) {
  reporterOptions = getopts(reporterOptions);
  __log.debug = reporterOptions.debug;
  __log('beforeAll! reporterOptions:',reporterOptions);
  writter.init(reporterOptions.filename);
};

plugin.afterAll = function(allCollection, reporterOptions) {
  reporterOptions = getopts(reporterOptions);
  __log.debug = reporterOptions.debug;
  __log('afterAll! allCollection:',allCollection);
  handleAllCollection(allCollection, reporterOptions);
};

// Expose path to reporter so it can be configured in e.g. grunt-jscs-checker
plugin.path = __dirname;
