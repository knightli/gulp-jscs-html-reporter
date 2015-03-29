/** @jsx React.DOM */

var React = require('react');
var ReporterApps = require('../components/ReporterApps.react.jsx');

// 初始 state 从 initial-state 这个script tag 内拿 (server 首屏吐在这个tag里)
function getAllData(){
  var data = {
    reporters : [],
    fileCount : 0,
    errorCount : 0
  };
  var stateScripts = document.querySelectorAll('.stateScript');
  stateScripts = Array.prototype.slice.call(stateScripts);
  stateScripts.map(function(script,idx) {
    var reporter = JSON.parse(script.innerHTML);
    data.reporters.push(reporter);
    if(reporter.errsets.length) {
      reporter.errsets.map(function(errset){
        data.fileCount ++;
        if(errset.errorList && errset.errorList.length) {
          data.errorCount += errset.errorList.length;
        }
      })
    }
  });
  return data;
}

var data = getAllData();
var reporters = data.reporters;
var errorCount = data.errorCount;
var fileCount = data.fileCount;

var options = {expandCode:false, expandErrorSet: false};

//defaultExpand true: 默认展开  false: 默认折叠
React.render(
  <ReporterApps reporters={reporters} options={options} errorCount={errorCount} fileCount={fileCount} />,
  document.getElementById('wrapper')
);
