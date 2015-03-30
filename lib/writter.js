var fs = require('fs');
var render = require('./render');

var styleContent = fs.readFileSync(__dirname + '/../assets/style.css', 'utf-8');
var scriptContent = fs.readFileSync(__dirname + '/../assets/bundle.js', 'utf-8');

var filename;

var header = [
  '<!DOCTYPE html><html>',
  '<head><meta charset="utf-8"><title>JSCS HTML Reporter</title>',
  '<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css">',
  '<style>',
  styleContent,
  '</style>',
  '</head>',
  '<body style="font-family:monospace;">'
  ].join('');


var footer = [
  '<script>'+scriptContent+'</script>',
  '</body>',
  '</html>'
  ].join('');

module.exports = {
  init: function(_filename){
    filename = _filename;
    fs.writeFileSync(filename, '处理中...', 'utf-8');
  },
  write: function(state){

    var markup = render(state);

    var content = [
      header,
      '<div id="wrapper">',
      markup,
      '</div>',
      '<script class="stateScript" type="application/json">' + JSON.stringify(state) + '</script>',
      footer
    ].join('');

    fs.writeFileSync(filename, content);
  }
};
