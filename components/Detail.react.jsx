/** @jsx React.DOM */

// Detail 组件: 展示具体的错误信息

var React = require('react');
var ErrorSet = require('./ErrorSet.react.jsx');

var Detail = React.createClass({
  render: function(){
    var options = this.props.options;
    var errsets = this.props.errsets;

    var content = errsets.length ? errsets.map(function(errset){
      return (
        <ErrorSet key={errset.filename} data={errset} />
      );
    }) : 'errsets length is 0';


    return (
      <div className="detail">{content}</div>
    );
  }
});

module.exports = Detail;
