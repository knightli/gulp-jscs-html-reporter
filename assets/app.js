/** @jsx React.DOM */

var React = require('react');
var ReporterApps = require('../components/ReporterApps.react.jsx');

// 初始 state 从 initial-state 这个script tag 内拿 (server 首屏吐在这个tag里)
function getAllReporters(){
  var stateScripts = document.querySelectorAll('.stateScript');
  stateScripts = Array.prototype.slice.call(stateScripts);
  var reporters = [];
  stateScripts.map(function(script,idx) {
    var reporter = JSON.parse(script.innerHTML);
    reporter.key = idx;
    reporters.push(reporter);
  });
  return reporters;
}

var reporters = getAllReporters();

React.render(
  <ReporterApps reporters={reporters} />,
  document.getElementById('wrapper')
);
