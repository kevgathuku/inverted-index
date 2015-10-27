# inverted-index

### How an Inverted Index works

[Inverted Index: Elastic Search](https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html)

### Online Test Suite

The test suite is available online at [https://kevgathuku.github.io/inverted-index/jasmine/SpecRunner.html](https://kevgathuku.github.io/inverted-index/jasmine/SpecRunner.html)


### Running the test suite locally

JavaScript shouldn't be able to access files from the local filesystem, so to be able to read the JSON file, a local static server needs to be set up.

Enter the following command in your Terminal, to install a local static file server using node:

```bash
$ npm install -g http-server
```

Navigate to the `jasmine` directory in the repo and start up the local server:
```bash
$ git clone https://github.com/kevgathuku/inverted-index
$ cd inverted-index/jasmine
$ http-server
```

The test suite is now available at: [http://localhost:8080/SpecRunner.html](http://localhost:8080/SpecRunner.html)
