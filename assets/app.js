/** @jsx React.DOM */

var React = require('react');
var ReporterApps = require('../components/ReporterApps.react.jsx');
var assign = require('object-assign');

// 初始 state 从 initial-state 这个script tag 内拿 (server 首屏吐在这个tag里)
function getInitState(){
  /*
  var data = {
    reporters : [],
    fileCount : 0,
    errorCount : 0
  };
  var stateScripts = document.querySelectorAll('.stateScript');
  stateScripts = Array.prototype.slice.call(stateScripts);
  stateScripts.map(function(script,idx) {
    var reporter = JSON.parse(script.innerHTML);

    if (!data.options && reporter.options) {
      data.options = reporter.options;
    }

    data.reporters.push(reporter);

    if (reporter.errsets.length) {
      reporter.errsets.map(function(errset){
        data.fileCount ++;
        if (errset.errorList && errset.errorList.length) {
          data.errorCount += errset.errorList.length;
        }
      })
    }
  });
  */

  var stateScripts = document.querySelectorAll('.stateScript');
  var stateScript = stateScripts[0];
  var data = JSON.parse(stateScript.innerHTML);

  return data;
}

var initState = getInitState();
initState = assign({options: {expandCode:false, expandErrorSet: false}}, initState);

//defaultExpand true: 默认展开  false: 默认折叠
React.render(
  <ReporterApps {...initState} />,
  document.getElementById('wrapper')
);
