/** @jsx React.DOM */

// ErrorItemMsg 组件: 展示一个 Error 的 Msg

var React = require('react');

var ErrorItemMsg = React.createClass({
  render: function(){
    var error = this.props.error;
    var filename = this.props.filename;

    var message = error.message;
    var line = error.line;
    var column = error.column;
    var pos = '(' + line + ' ,' + column + ')';

    return (
      <div className="error-item-msg"><b className="label label-danger">{message}</b> at <i className="label label-default">{filename}</i> {pos}</div>
    );
  }
});

module.exports = ErrorItemMsg;
