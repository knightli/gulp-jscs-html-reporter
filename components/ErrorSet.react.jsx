/** @jsx React.DOM */

// ErrorSet 组件: 展示一个 ErrorSet

var React = require('react');
var ErrorItem = require('./ErrorItem.react.jsx');
var Helpers = require('../util/Helpers');

var ErrorSet = React.createClass({
  render: function(){
    var data = this.props.data;
    var filename = data.filename;
    var errorList = data.errorList;

    var content = errorList.length ? errorList.map(function(error){
      return (
        <ErrorItem key={error.line+','+error.column} error={error} filename={filename} />
      );
    }) : 'errsets length is 0';

    return (
      <div className={Helpers.cx({
        "error-set": true,
        "hide": !data.expandErrorSet
      })}>{content}</div>
    );
  }
});

module.exports = ErrorSet;
