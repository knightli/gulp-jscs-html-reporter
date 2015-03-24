/** @jsx React.DOM */

// JSCS 组件

var React = require('react');
var Summary = require('./Summary.react.jsx');
var Detail = require('./Detail.react.jsx');

var Reporter = React.createClass({
  getInitialState: function(props){

    props = props || this.props;

    return {
      errsets: props.errsets,
      options: props.options
    };

  },
  render: function(){
    return (
      <div className="reporter container-fluid">
        <Summary errsets={this.state.errsets} />
        <Detail errsets={this.state.errsets} options={this.state.options} />
      </div>
    );
  }
});

module.exports = Reporter;
