/** @jsx React.DOM */

// JSCS 组件

var React = require('react');
var Reporter = require('./Reporter.react.jsx');

var ReporterApps = React.createClass({
  getInitialState: function(props){

    props = props || this.props;

    return {
      reporters: props.reporters
    };

  },
  render: function(){
    var reporters = this.props.reporters;

    var content = reporters.map(function(reporter){
      return (
        <Reporter errsets={reporter.errsets} options={reporter.options} />
      );
    });

    return (
      <div id="reporter-app">{content}</div>
    );
  }
});

module.exports = ReporterApps;
