/** @jsx React.DOM */

// JSCS 组件

var React = require('react');
var Reporter = require('./Reporter.react.jsx');

var AppStore = require('../store/AppStore');

function getStateFromStore(){
  return {
    reporters: AppStore.getData()
  }
}

var ReporterApps = React.createClass({

  getInitialState: function(props){

    if(this.props.reporters){
      AppStore.init(this.props.reporters);
    }
    return getStateFromStore();

  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStore());
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
