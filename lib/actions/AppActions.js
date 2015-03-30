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

  toggleErrorsetExpand: function(errset) {
    AppDispatcher.dispatch({
      actionType: "REPORTER_ERROR_TOGGLE_ERROR_SET_EXPAND",
      errset: errset
    });
  },

  toggleCodeExpandAll: function() {
    AppDispatcher.dispatch({
      actionType: "REPORTER_ERROR_TOGGLE_CODE_EXPAND_ALL"
    });
  },

  toggleErrorsetExpandAll: function() {
    AppDispatcher.dispatch({
      actionType: "REPORTER_ERROR_TOGGLE_ERROR_SET_EXPAND_ALL"
    });
  }
};

module.exports = AppActions;
