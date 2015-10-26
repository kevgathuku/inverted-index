'use strict';

function Filter() {
  // List of Stop Words from PostgreSQL 9.4.5
  this.stopWords = [
  'a', 'about', 'above', 'after', 'again', 'against', 'all','am', 'an', 'and',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before','being',
  'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do', 'does',
  'doing', 'don', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself',
  'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its',
  'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not',
  'now','of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 's', 'same', 'she', 'should','so','some',
  'such', 't','than', 'that', 'the', 'their', 'theirs', 'them', 'themselves',
  'then','there', 'these', 'they', 'this', 'those', 'through', 'to', 'too',
  'under','until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
  'which','while', 'who', 'whom', 'why', 'will', 'with','you', 'your','yours',
  'yourself', 'yourselves',];
}

Filter.prototype = {
  constructor: Filter,
  removePunctuation: function(inputString) {
    return inputString.replace(/\,|\./g, '');
  },

  removeStopWords: function(termsArray) {
    var _filtered = [];

    // Iterate through the array to remove stop words
    for (var i = 0, len = termsArray.length; i < len; i++) {
      // If the terms is not in the stopWords array
      // Add it to the final filtered list
      if (this.stopWords.indexOf(termsArray[i]) === -1) {
        _filtered.push(termsArray[i]);
      }
    }

    return _filtered;
  },

  removeDuplicates: function(termsArray) {
    var _results = [];
    for (var i = 0, len = termsArray.length; i < len; i++) {
      if (_results.indexOf(termsArray[i]) === -1) {
        _results.push(termsArray[i]);
      }
    }

    return _results;
  },
};

function Index() {
  this.results = {};
}

Index.prototype = {
  constructor: Index,
  createIndex: function(filePath, callback) {
    // Create a copy of the Index object referred to by 'this'
    var self = this;
    return $.getJSON(filePath, function(data) {
      // Invoke the callback only if it's a function
      if (typeof callback === 'function') {
        // Invoke the callback, passing the Index object and the JSON data
        callback(self, data);
      }
    });
  },

  populateIndex: function(self, data) {
    var filter = new Filter();
    var finalArray, inputString, splitArray, uniqueArray;

    // Iterate over each object in the array
    data.forEach(function(value, index) {
      // Convert to lowercase and remove fullstops and commas
      inputString = filter.removePunctuation(value.text.toLowerCase());

      // Split the strings into an array of words
      splitArray = inputString.split(' ');

      // Remove duplicated from the array
      uniqueArray = filter.removeDuplicates(splitArray);

      // Remove stop words
      finalArray = filter.removeStopWords(uniqueArray);

      // Create the index on the self.results object
      for (var i = 0, len = finalArray.length; i < len; i++) {
        self.results[finalArray[i]] = index;
      }
    });
  },

  getIndex: function() {
    return this.results;
  },
};
