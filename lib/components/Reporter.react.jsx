/** @jsx React.DOM */

// JSCS 组件

var React = require('react');
var Summary = require('./Summary.react.jsx');
var Detail = require('./Detail.react.jsx');

var Reporter = React.createClass({
  render: function(){
    return (
      <div className="reporter panel panel-primary">
        <Summary errsets={this.props.errsets} />
        <Detail errsets={this.props.errsets} options={this.props.options} />
      </div>
    );
  }
});

module.exports = Reporter;
