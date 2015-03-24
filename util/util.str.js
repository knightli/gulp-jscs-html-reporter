module.exports = {
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
