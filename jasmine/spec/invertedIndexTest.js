describe('Inverted Index Tests: ', function() {

  var index = new Index();
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
    })
  });

  describe('Populates Index', function() {

    it('creates the index once JSON file has been read', function() {
      expect(index.results).not.toEqual({});
    })
  });
});
