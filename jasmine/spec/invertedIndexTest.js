describe('Inverted Index Tests: ', function() {

  var index = new Index();
  var filter = new Filter();
  var results;

  beforeEach(function(done) {
    index.createIndex('books.json', index.populateIndex).done(function(data) {
      results = data;

      // Invoke jasmine's done callback
      done();
    });
  });

  describe('Reads book data', function() {

    it('reads the JSON file successfully', function() {
      expect(results).not.toBeUndefined();
      expect(results.length).not.toEqual(0);
      expect(results.length).toEqual(2);
    });
  });

  describe('Populates Index', function() {

    it('creates the index once JSON file has been read', function() {
      expect(index.results).not.toEqual({});
    });

    it('creates an index containing only lowercase terms', function() {
      var keys = Object.keys(index.results);
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(keys[i]).toBe(keys[i].toLowerCase());
      }
    });

    it('creates index strings without punctuation', function() {
      var keys = Object.keys(index.results);
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(keys[i].indexOf('.')).toBe(-1);
        expect(keys[i].indexOf(',')).toBe(-1);
      }
    });

    it('creates index strings without stop words', function() {
      var keys = Object.keys(index.results);
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(filter.stopWords.indexOf(keys[i])).toBe(-1);
      }
    });
  });
});
