'use strict';

function Index() {
  this.results = {};
}

Index.prototype = {
  constructor: Index,
  createIndex: function(filePath, callback) {
    return $.getJSON(filePath, function(data) {
      // Invoke the callback only if it's a function
      if (typeof callback === 'function') {
        callback(data);
      }
    });
  },

  populateIndex: function(data) {
    // TODO
  },

  getIndex: function() {
    return this.results;
  },
};
