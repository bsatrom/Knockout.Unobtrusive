var jsdom = require('jsdom'),
    fs = require('fs'),
    dom = fs.readFileSync("./tests/knockout.unobtrusive.tests.html").toString(),
    document = jsdom.jsdom(dom, null, { features: { QuerySelector: true } }),
    window = document.createWindow(), //jsdom.jsdom().createWindow(),
    navigator = {
      userAgent: 'node-js'
    };

    
window.navigator = navigator;
   
global.window = window;
global.navigator = navigator;
global.document = window.document;

global.isNode = true;

require('../lib/knockout-1.2.1.js');

global.ko = window.ko;

global.rebuildDom = function() {
  global.document = jsdom.jsdom(dom, null, { features: { QuerySelector: true } });
  global.window = global.document.createWindow();
};