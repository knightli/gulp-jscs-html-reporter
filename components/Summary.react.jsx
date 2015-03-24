/** @jsx React.DOM */

// Summary 组件: 展示总的错误提示信息

var React = require('react');

var Summary = React.createClass({
  render: function(){
    var errset = this.props.errsets[0] || {};
    var filename = errset.filename;
    var errorCount = errset.errorList.length;

    return (
      <div className="well summary">
        <span className="label label-default">{filename}</span> <span className="label label-warning">{errorCount} errors</span>
      </div>
    );
  }
});

module.exports = Summary;
