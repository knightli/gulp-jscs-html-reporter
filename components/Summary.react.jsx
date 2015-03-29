/** @jsx React.DOM */

// Summary 组件: 展示总的错误提示信息

var React = require('react');
var Helpers = require('../util/Helpers');
var AppActions = require('../actions/AppActions');
var AppStore = require('../store/AppStore');

var Summary = React.createClass({
  _toggleErrorsetExpand: function() {
    AppActions.toggleErrorsetExpand(this.props.errsets[0]);
  },
  _toggleCodeExpandErrorSet: function() {
    AppActions.toggleCodeExpandErrorSet(this.props.errsets[0]);
  },
  render: function(){
    var errset = this.props.errsets[0] || {};
    var filename = errset.filename;
    var errorCount = errset.errorList.length;
    var isAllExpanded = AppStore.isAllCodeExpandedInErrorSet(errset);

    return (
      <div className="summary panel-heading">
        <div className="panel-title">
          <code>{filename}</code> found <span className="badge error">{errorCount}</span> errors!
          <label className={Helpers.cx({
            "label-success": isAllExpanded,
            "label-default": !isAllExpanded,
            "navbar-toggle": true,
            "label": true,
          })} onClick={this._toggleCodeExpandErrorSet}>Ⓒ展开代码</label>
          <label className={Helpers.cx({
            "label-success": errset.expandErrorSet,
            "label-default": !errset.expandErrorSet,
            "navbar-toggle": true,
            "label": true,
          })} onClick={this._toggleErrorsetExpand}>Ⓓ展开详情</label>
        </div>
      </div>
    );
  }
});

module.exports = Summary;
