/** @jsx React.DOM */

// ErrorItemCode 组件: 展示一个 Error 的 Code

var React = require('react');

var strUtil = require('../util/util.str');

function renderLine(code, line, column){
  var isErrorLine = typeof column !== 'undefined';
  var lineClass = isErrorLine ? 'line error-line' : 'line nomarl-line';

  function handleCode(str) {
    return strUtil.spaceTrans(strUtil.encodeHtml(str));
  }

  if(isErrorLine) {
    var lineSeps = [
      column ? code.substr(0, column-1) : code.substr(0, column),
      column ? code.substring(column-1,column+1) : code.charAt(column+1),
      code.substr(column+1)
    ];
    code = handleCode(lineSeps[0])
      + '<span class="hightlight-col">' + handleCode(lineSeps[1]) + '</span>'
      + handleCode(lineSeps[2]);
  }
  else{
    code = handleCode(code);
  }

  return (
    <tr key={line} className={lineClass}>
      <td className="col">{line}</td>
      <td>
        <code
          dangerouslySetInnerHTML={{
            __html: code
          }}
        >
        </code>
      </td>
    </tr>
  );

}

var ErrorItemCode = React.createClass({
  render: function(){
    var error = this.props.error;
    var filename = this.props.filename;

    var message = error.message;
    var line = error.line;
    var column = error.column;
    var lines = error.lines;

    var content = lines.map(function(l) {
      var i = l.line;
      var code = l.code;
      if(i==line-1) return renderLine(code, i, column);
      else return renderLine(code, i);
    });


    return (
      <div className="error-item-code">
        <table>
          {content}
        </table>
      </div>
    );
  }
});

module.exports = ErrorItemCode;
