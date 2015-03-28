/** @jsx React.DOM */

// ErrorItem 组件: 展示一个 Error

var React = require('react');
var ErrorItemMsg = require('./ErrorItemMsg.react.jsx');
var ErrorItemCode = require('./ErrorItemCode.react.jsx');
var AppActions = require('../actions/AppActions');

var ErrorItem = React.createClass({
  _onToggleCodeExpand: function() {
    AppActions.toggleCodeExpand(this.props.error);
  },
  render: function(){
    var error = this.props.error;
    var filename = this.props.filename;

    return (
      <div className="error-item panel panel-default">
        <ErrorItemMsg filename={filename} error={error} onToggleCodeExpand={this._onToggleCodeExpand}/>
        <ErrorItemCode error={error}  />
      </div>
    );
  }
});

module.exports = ErrorItem;
