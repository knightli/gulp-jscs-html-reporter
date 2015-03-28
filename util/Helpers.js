module.exports = {
  cx: function(classNames) {
    if (typeof classNames == 'object') {
      return Object.keys(classNames).filter(function(className) {
        return classNames[className];
      }).join(' ');
    } else {
      return Array.prototype.join.call(arguments, ' ');
    }
  },
  encodeHtml: function(string) {
    var entitiesMap = {
      '&': '&amp;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;'
    };

    return (string || '').replace(/(&|"|<|>)/g, function (entity) {
      return entitiesMap[entity];
    });
  },
  spaceTrans: function(input) {
    return input.replace(/\t/g, '&nbsp;').replace(/ /g,'&nbsp;')
  }
}
