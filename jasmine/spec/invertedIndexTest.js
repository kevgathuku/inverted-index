describe('Inverted Index Tests: ', function() {

  var index = new Index();
  var results;

  beforeEach(function(done) {
    index.createIndex('books.json').done(function(data) {
      results = data;

      // Invoke jasmine's done callback
      done();
    })
  });

  describe('Reads book data', function() {

    it("reads the JSON file successfully", function() {
      expect(results).not.toBeUndefined();
      expect(results.length).not.toEqual(0);
      expect(results.length).toEqual(2);
    })
  });
});
