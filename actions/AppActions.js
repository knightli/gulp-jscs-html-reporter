var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

  toggleCodeExpand: function(error) {
    AppDispatcher.dispatch({
      actionType: "REPORTER_ERROR_TOGGLE_CODE_EXPAND",
      error: error
    });
  },

  toggleCodeExpandErrorSet: function(errset) {
    AppDispatcher.dispatch({
      actionType: "REPORTER_ERROR_TOGGLE_CODE_EXPAND_ERROR_SET",
      errset: errset
    });
  },

  xxxxxx: function(param) {
    AppDispatcher.dispatch({
      actionType: "XXXXXX",
      param: param
    });
  }
};

module.exports = AppActions;
