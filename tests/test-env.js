var jsdom = require('jsdom'),
    fs = require('fs'),
    dom = fs.readFileSync("./tests/knockout.unobtrusive.tests.html").toString(),
    document = jsdom.jsdom(dom),
    window = document.createWindow(), //jsdom.jsdom().createWindow(),
    navigator = {
      userAgent: 'node-js'
    },
    $ = require('jquery').create(window);

    
window.navigator = navigator;
    
global.window = window;
global.navigator = navigator;
global.document = window.document;
global.$ = $;

global.rebuildDom = function() {
  global.document = jsdom.jsdom(dom);
  global.window = global.document.createWindow();
};