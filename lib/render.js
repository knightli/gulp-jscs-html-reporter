var JSX = require('node-jsx').install({
  extension: '.jsx'
});

var React = require('react');
var ReporterApps = require('./components/ReporterApps.react.jsx');
var ReporterAppsFactory = React.createFactory(ReporterApps);

module.exports = function(state) {
  var markup = '';

  try{
    markup = React.renderToString(ReporterAppsFactory(state));
  }catch(e){
    console.trace(e);
  }

  return markup;
}
