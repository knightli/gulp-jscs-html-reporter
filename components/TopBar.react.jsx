/** @jsx React.DOM */

// NotificationBar 组件: 渲染当有新消息时, 显示在顶部的小黄条

var React = require('react');

var expandBtnText = [
  '展开全部',
  '收起全部'
];

var TopBar = React.createClass({
  getInitialState: function(props){

    props = props || this.props;

    return {
      expand: props.expand
    };

  },

  toggle: function(){
    this.props.onToggleExpand();
    var expand = this.state.expand == 1 ? 0 : 1;
    this.setState({expand: expand});
  },

  render: function(){
    var wording = expandBtnText[this.state.expand];

    return (
      <div className="top-bar">
        <a href="javascript:void(0)" onClick={this.toggle}>{wording}</a>
      </div>
    );
  }
});

module.exports = TopBar;
