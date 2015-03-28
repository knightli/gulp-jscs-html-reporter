var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _data = [];
var _defaultOptions = {expandCode:true, expandErrorSet: false};

var useImmuteable = true;

function xxxxxx(){
  console.log('handle event xxxxxx to operate data');
}

function init(reporters, options){
  options = assign({}, _defaultOptions, options);

  reporters = Array.prototype.slice.call(reporters);

  if(reporters && reporters.length) {
    reporters.map(function(reporter,idx0){
      var errsets = reporter.errsets;
      reporter.key = ""+idx0;
      if(errsets && errsets.length){
        errsets.map(function(errset,idx1){
          errset.key = [idx0,idx1].join('-');
          errset = assign(errset, {expandErrorSet: options.expandErrorSet});
          if(errset.errorList && errset.errorList.length) {
            errset.errorList.map(function(error,idx2){
              error.key = [idx0,idx1,idx2].join('-');
              error = assign(error, {expandCode: options.expandCode});
            });
          }
        });
      }
    });
  }
  _data = reporters;
}

function getDataByKey(key){

  if(typeof key=="undefined") {
    return;
  }

  var paths = key.split('-').map(function(i){
    return parseInt(i,10);
  });

  var ref = _data, idx;
  for(var deep=0,len=paths.length; deep<len; deep++){
    idx = paths[deep];
    ref = getRef(deep, ref, idx);
  }
  return ref;
}

function getRef(deep, parent, idx) {
  if(deep==0) return parent[idx];
  if(deep==1) return parent.errsets[idx];
  if(deep==2) return parent.errorList[idx];
}

function toggleCodeExpand(error) {

  if(useImmuteable) {
    // 使用immuteable的情况下, 需要通过key找到引用之后修改才起作用
    // 注意: 这里的实现是一个非常简陋的方式, 简单的案例里面可以这么干
    // 复杂的势必后续需要一个统一的引用管理方式 (从分配key, 到通过key找引用)
    error = getDataByKey(error.key);

  }

  // 不使用immuteable, 对于引用类型的数据结构, 修改内部信息, 下面这种写法也能起作用.

  // 这样看起来是方便了, 在这里简单赋值就可以修改数据
  // 而且甚至于可以在组件里就地修改数据都可以, 没必要到store里统一修改:
  //   注意: 不过后者的方式下, 在组件内修改完数据, 事件还是必须触发
  //   触发事件是为了触发顶层组件的setState处理,进而触发组件的数据变化检查, 进而re-render组件

  // 但这样在复杂应用里,副作用很大:
  //   1) 一个数据到底是否是引用, 是不一定的, 这样一来, 修改数据的模式变得不稳定
  //   2) 一旦滥用, 数据的修改就又变得成为分散各处的逻辑, 没有一个地方统一管理了. 这些分散的逻辑很容易忘记事件通知的周全.
  //   3) 数据流动变得混乱之后, 脏数据检查以及数据变动检查的范围就不容易做优化了, 对re-render的性能有一定影响


  if(error){
    error.expandCode = !error.expandCode;
  }
}

function isAllCodeExpandedInErrorSet(errset){

  if(useImmuteable) {
    errset = getDataByKey(errset.key);
  }

  if(errset) {
    for(var i=0,len=errset.errorList.length; i<len; i++) {
      var error = errset.errorList[i];
      if(!error.expandCode) return false;
    }
    return true;
  }
  else{
    return false;
  }
}

function toggleCodeExpandErrorSet(errset) {
  if(useImmuteable) {
    errset = getDataByKey(errset.key);
  }
  if(errset) {

    var isAllExpanded = isAllCodeExpandedInErrorSet(errset);

    errset.errorList.map(function(error){
      error.expandCode = !isAllExpanded;
    });
  }
}

var AppStore = assign({}, EventEmitter.prototype, {
  init: init,
  getData: function(){
    return _data;
  },
  isAllCodeExpandedInErrorSet: isAllCodeExpandedInErrorSet,
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

    case "REPORTER_ERROR_TOGGLE_CODE_EXPAND":
      toggleCodeExpand(action.error);
      AppStore.emitChange();
      break;

    case "REPORTER_ERROR_TOGGLE_CODE_EXPAND_ERROR_SET":
      toggleCodeExpandErrorSet(action.errset);
      AppStore.emitChange();
      break;

    case "XXXXXX":
      xxxxxx();
      AppStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStore;
