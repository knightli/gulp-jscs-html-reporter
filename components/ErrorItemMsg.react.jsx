/** @jsx React.DOM */

// ErrorItemMsg 组件: 展示一个 Error 的 Msg

var React = require('react');
var Helpers = require('../util/Helpers');

var ErrorItemMsg = React.createClass({
  _toggleCodeExpand: function() {
    this.props.onToggleCodeExpand();
  },
  render: function(){
    var error = this.props.error;
    var filename = this.props.filename;

    var message = error.message;
    var line = error.line;
    var column = error.column;

    return (
      <div className="error-item-msg panel-heading">
        <label className={Helpers.cx({
          "label-success": error.expandCode,
          "label-default": !error.expandCode,
          "label": true,
          "char-label": true
        })}
          onClick={this._toggleCodeExpand}>Ⓒ {line},{column}</label>
        <span className="error-item-msg-text panel-title">
          {message}
        </span>
      </div>
    );
  }
});

module.exports = ErrorItemMsg;
