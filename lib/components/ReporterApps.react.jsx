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

function getTimeStr(time) {
  if(!time) return null;
  time = new Date(time);
  var day = time.getDate();
  var hh = time.getHours();
  var mm = time.getMinutes();

  day = day < 10 ? "0" + day : day;
  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  var str = (time.getFullYear() + "年") + (time.getMonth() - -1) + "月" + day + "日 " + hh + ":" + mm;
  return str;
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
    var timeStr = getTimeStr(this.props.options.time);

    return (
      <div id="reporter-app" className="reporter-app">
        <div className="navbar navbar-inverse navbar-fixed-top">
          <span className="navbar-brand">Found <span className="badge error">{this.props.errorCount}</span> errors in {this.props.fileCount} files!</span>
          <span className="timestamp">{timeStr}</span>
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
