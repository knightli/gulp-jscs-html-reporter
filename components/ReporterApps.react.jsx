/** @jsx React.DOM */

// JSCS 组件

var React = require('react');
var Reporter = require('./Reporter.react.jsx');

var AppStore = require('../store/AppStore');
var AppActions = require('../actions/AppActions');
var Helpers = require('../util/Helpers');

function getStateFromStore(){
  var ret = {
    reporters: AppStore.getData(),
    isAllErrorSetExpand: AppStore.isAllErrorSetExpand(),
    isAllCodeExpand: AppStore.isAllCodeExpand()
  };
  return ret;
}

var ReporterApps = React.createClass({

  getInitialState: function(props){
    if(this.props.reporters){
      AppStore.init(this.props.reporters, this.props.options);
    }
    return getStateFromStore();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _toggleCodeExpandAll: function() {
    AppActions.toggleCodeExpandAll();
  },

  _toggleErrorsetExpandAll: function() {
    AppActions.toggleErrorsetExpandAll();
  },

  _onChange: function() {
    this.setState(getStateFromStore());
  },

  render: function(){
    var reporters = this.state.reporters;

    var content = reporters.map(function(reporter){
      return (
        <Reporter key={reporter.key} errsets={reporter.errsets} options={reporter.options} />
      );
    });

    return (
      <div id="reporter-app" className="reporter-app">
        <div className="navbar navbar-inverse navbar-fixed-top">
          <span className="navbar-brand">Found <span className="badge error">{this.props.errorCount}</span> errors in {this.props.fileCount} files! </span>
          <label className={Helpers.cx({
            "label-success": this.state.isAllCodeExpand,
            "label-default": !this.state.isAllCodeExpand,
            "navbar-toggle": true,
            "label": true,
          })} onClick={this._toggleCodeExpandAll}>Ⓒ展开所有代码</label>
          <label className={Helpers.cx({
            "label-success": this.state.isAllErrorSetExpand,
            "label-default": !this.state.isAllErrorSetExpand,
            "navbar-toggle": true,
            "label": true,
          })} onClick={this._toggleErrorsetExpandAll}>Ⓓ展开所有详情</label>
        </div>
        <div className="reporters">
          {content}
        </div>
      </div>
    );
  }
});

module.exports = ReporterApps;
