/** @jsx React.DOM */

// ErrorItem 组件: 展示一个 Error

var React = require('react');
var ErrorItemMsg = require('./ErrorItemMsg.react.jsx');
var ErrorItemCode = require('./ErrorItemCode.react.jsx');

var ErrorItem = React.createClass({
  render: function(){
    var error = this.props.error;
    var filename = this.props.filename;

    return (
      <div className="error-item">
        <ErrorItemMsg filename={filename} error={error} />
        <ErrorItemCode error={error} />
      </div>
    );
  }
});

module.exports = ErrorItem;
