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
      expect(results).toBeDefined();
      expect(results.length).not.toEqual(0);
      expect(results.length).toEqual(2);
    });
  });

  describe('Populates Index', function() {

    var index0 = ['alice', 'rabbit', 'imagination', 'world'];
    var index1 = ['alliance', 'elf', 'dwarf', 'wizard'];

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

    it('creates index containing correct terms', function() {
      var keys = Object.keys(index.results);

      for (var i = 0, len = index0.length; i < len; i++) {
        expect(keys).toContain(index0[i]);
      }

      for (var i = 0, len = index1.length; i < len; i++) {
        expect(keys).toContain(index0[i]);
      }
    });

    it('maps string keys to the correct objects', function() {
      var keys = Object.keys(index.results);

      // Should return 0 for objects in the first array element
      for (var i = 0, len = index0.length; i < len; i++) {
        expect(index.results[index0[i]]).toBe(0);
      }

      // Should return 1 for objects in the second array element
      for (var i = 0, len = index0.length; i < len; i++) {
        expect(index.results[index1[i]]).toBe(1);
      }
    });
  });
});
