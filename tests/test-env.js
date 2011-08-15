var jsdom = require('jsdom'),
    fs = require('fs'),
    dom = fs.readFileSync("./tests/knockout.unobtrusive.tests.html").toString(),
    document = jsdom.jsdom(dom),
    window = document.createWindow(), //jsdom.jsdom().createWindow(),
    navigator = {
      userAgent: 'node-js'
    },
    $ = require('jquery');

    
window.navigator = navigator;
    
this.window = window;
this.navigator = navigator;
this.document = window.document;
this.$ = $;