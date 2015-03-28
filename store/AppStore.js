var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _data = [];

function xxxxxx(){
  console.log('handle event xxxxxx to operate data');
}

var AppStore = assign({}, EventEmitter.prototype, {
  init: function(data){
    _data = data;
  },
  getData: function(){
    return _data;
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case "XXXXXX":
      xxxxxx();
      AppStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStore;
