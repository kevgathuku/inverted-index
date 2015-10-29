describe('Inverted Index Tests: ', function() {
  'use strict';
  var index = new Index();
  var filter = new Filter();
  var filePath = './books.json';
  var path;

  beforeEach(function(done) {
    index.createIndex(filePath).done(function(data) {
      index.parsedJSON = data;
      path = index.extractFileName(filePath);

      // Invoke jasmine's done callback
      done();
    });
  });

  describe('Reads book data', function() {

    it('reads the JSON file successfully', function() {
      expect(index.parsedJSON).toBeDefined();
      expect(index.parsedJSON.length).not.toEqual(0);
      expect(index.parsedJSON.length).toEqual(2);
    });

    it('Ensures each object property contains a string value', function() {
      for (var i = 0, len = index.parsedJSON.length; i < len; i++) {
        // Iterate over the properties of each object
        for (var key in index.parsedJSON[i]) {
          // Ensure the value is a string
          expect(typeof index.parsedJSON[i][key]).toBe('string');
        }
      }
    });

    it('tracks that the spy was called', function(done) {
      var testObj = new Index();

      // Spy on the `populateIndex method`
      spyOn(testObj, 'populateIndex').and.callThrough();
      testObj.createIndex(filePath, testObj.populateIndex)
        .done(function(data) {
          expect(testObj.populateIndex).toHaveBeenCalled();
          expect(testObj.populateIndex).toHaveBeenCalledWith(testObj, path, data);

          // Indicate to jasmine that the async function is complete
          done();
        });
    });

  });

  describe('Populates Index', function() {

    var index0 = ['alice', 'rabbit', 'imagination', 'world'];
    var index1 = ['alliance', 'elf', 'dwarf', 'wizard'];

    it('creates the index once JSON file has been read', function() {
      expect(index.getIndex(path)).not.toEqual({});
    });

    it('creates an index containing only lowercase terms', function() {
      var keys = Object.keys(index.getIndex(path));
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(keys[i]).toBe(keys[i].toLowerCase());
      }
    });

    it('creates index strings without punctuation', function() {
      var keys = Object.keys(index.getIndex(path));
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(keys[i].indexOf('.')).toBe(-1);
        expect(keys[i].indexOf(',')).toBe(-1);
      }
    });

    it('creates index strings without stop words', function() {
      var keys = Object.keys(index.getIndex(path));
      for (var i = 0, len = keys.length; i < len; i++) {
        expect(filter.stopWords.indexOf(keys[i])).toBe(-1);
      }
    });

    it('creates index containing correct terms', function() {
      var keys = Object.keys(index.getIndex(path));

      for (var i = 0, len = index0.length; i < len; i++) {
        expect(keys).toContain(index0[i]);
      }

      for (var i = 0, len = index1.length; i < len; i++) {
        expect(keys).toContain(index0[i]);
      }
    });

    it('maps string keys to the correct objects', function() {
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
      expect(index.searchIndex('rabbit')).toEqual([0]);
      expect(index.searchIndex('hobbit')).toEqual([1]);
    });

    it('returns -1 when none of the terms is found', function() {
      expect(index.searchIndex('haha')).toEqual([-1]);
    });

    it('handles an array of search terms', function() {
      expect(index.searchIndex(['haha', 'impossible'])).toEqual([-1, -1]);
      expect(index.searchIndex(['imagination', 'dwarf'])).toEqual([0, 1]);
    });

    it('handles varied number of of search terms as arguments', function() {
      expect(index.searchIndex()).toEqual([]);
      expect(index.searchIndex([])).toEqual([]);
      expect(index.searchIndex(['imagination'])).toEqual([0]);
      expect(index.searchIndex('imagination', 'dwarf')).toEqual([0, 1]);
      expect(index.searchIndex('imagination', 'dwarf', 'warrior')).toEqual([0, 1, -1]);
    });

    it('does not take too long to execute', function() {
      var terms = [
        'alice', 'rings', 'lord', 'wonderland',
        'enters', 'imagination', 'hole', 'rabbit',
        'world', 'elf', 'dwarf', 'hobbit', 'wizard',
        'destroy', 'ring', 'seek', 'alliance', 'man',
        'non-existent', 'words', 'too'
      ];

      // Start tracking time just before the function is called
      // https://developers.google.com/web/updates/2012/08/When-milliseconds-are-not-enough-performance-now
      var start = performance.now();

      // save the results in a variable
      var results = index.searchIndex(terms);

      // Check the time after the function is done
      var end = performance.now();

      // check that the correct results are returned
      expect(results.length).toBe(terms.length);

      // check that the time is below 1 ms
      expect(end - start).toBeLessThan(1);
    });
  });
});
