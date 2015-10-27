describe('Inverted Index Tests: ', function() {

  var index = new Index();
  var filter = new Filter();
  var filePath = './books.json';
  var results, path;

  beforeEach(function(done) {
    index.createIndex(filePath, index.populateIndex).done(function(data) {
      results = data;
      path = index.extractFileName(filePath);

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

    it('Ensures each object property contains a string value', function() {
      for (var i = 0, len = results.length; i < len; i++) {
        // Iterate over the properties of each object
        for(key in results[i]) {
          // Ensure the value is a string
          expect(typeof results[i][key]).toBe('string');
        }
      }
    });
  });

  describe('Populates Index', function() {

    var index0 = ['alice', 'rabbit', 'imagination', 'world'];
    var index1 = ['alliance', 'elf', 'dwarf', 'wizard'];

    it('creates the index once JSON file has been read', function() {
      expect(index. getIndex(path)).not.toEqual({});
    });

    it('creates an index containing only lowercase terms', function() {
      var keys = Object.keys(index. getIndex(path));
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(keys[i]).toBe(keys[i].toLowerCase());
      }
    });

    it('creates index strings without punctuation', function() {
      var keys = Object.keys(index. getIndex(path));
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(keys[i].indexOf('.')).toBe(-1);
        expect(keys[i].indexOf(',')).toBe(-1);
      }
    });

    it('creates index strings without stop words', function() {
      var keys = Object.keys(index. getIndex(path));
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(filter.stopWords.indexOf(keys[i])).toBe(-1);
      }
    });

    it('creates index containing correct terms', function() {
      var keys = Object.keys(index. getIndex(path));

      for (var i = 0, len = index0.length; i < len; i++) {
        expect(keys).toContain(index0[i]);
      }

      for (var i = 0, len = index1.length; i < len; i++) {
        expect(keys).toContain(index0[i]);
      }
    });

    it('maps string keys to the correct objects', function() {
      var keys = Object.keys(index. getIndex(path));

      // Should return 0 for objects in the first array element
      for (var i = 0, len = index0.length; i < len; i++) {
        expect(index.results[path][index0[i]]).toBe(0);
      }

      // Should return 1 for objects in the second array element
      for (var i = 0, len = index0.length; i < len; i++) {
        expect(index.results[path][index1[i]]).toBe(1);
      }
    });
  });

  describe('Search Index', function() {

    it('returns accurate results when searched', function() {
      expect(Array.isArray(index.searchIndex('elf'))).toBe(true);
      expect(index.searchIndex('rabbit')).toContain(0);
      expect(index.searchIndex('hobbit')).toContain(1);

      // The returned array should have a maximum of 2 elements
      expect(index.searchIndex(['imagination', 'dwarf', 'hobbit']).length)
            .toBe(2);
    });

    it('returns -1 when none of the terms is found', function() {
      expect(index.searchIndex('haha')).toBe(-1);
    });

    it('handles an array of search terms', function() {
      expect(index.searchIndex(['haha', 'impossible'])).toBe(-1);
      expect(index.searchIndex(['imagination', 'dwarf'])).toContain(0);
      expect(index.searchIndex(['imagination', 'dwarf'])).toContain(1);
    });

    it('handles varied number of of search terms as arguments', function() {
      expect(index.searchIndex()).toBe(-1);
      expect(index.searchIndex([])).toBe(-1);
      expect(index.searchIndex(['imagination'])).toContain(0);
      expect(index.searchIndex('imagination', 'dwarf')).toContain(1);
      expect(index.searchIndex('imagination', 'dwarf', 'warrior')).toContain(1);
      expect(index.searchIndex('imagination', 'dwarf', 'warrior').length).toBe(2);
    });

  });
});
