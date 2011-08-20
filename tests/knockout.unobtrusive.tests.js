(function(global) {

  var module, get, getAll, camalizer, data,
      dataMatcher = /data-(.+)/,
      dashAlphaMatcher = /-([a-z])/ig;

  module = QUnit.module;

  module('createBindings', {
    teardown: function() {
      if(!QUnit.reset) {
        rebuildDom();
      }
    }
  });

  //if we don't have jQuery we're going to kind of fake it through some other methods like get and getAll
  if(typeof $ !== 'undefined') {
    //well we do have jQuery so defer to that
    getAll = get = $;
  } else {
    //no jQuery so we'll fake it
    camalizer = function(x, letter) {
      return letter.toUpperCase();
    };
    
    data = function(el) {
      var attribute,
          attributes = el.attributes,
          data = {};
      //build up an object that looks like the dataset attribute
      for(var i = 0, il = attributes.length; i < il; i++) {
        attribute = attributes[i];
        if(dataMatcher.test(attribute.name)) {
          data[attribute.name.match(dataMatcher)[1].replace(dashAlphaMatcher, camalizer)] = attribute.value;
        }
      }
      //expose a method to find a data attribute, just like jQuery would
      return function(attr) {
        return data[attr];
      };
    };
    
    //a fake version of 'get single element'. Pass in an ID or a query
    //note - if querySelectorAll isn't supported it'll fail
    get = function(id) {
      if(id.indexOf('#') === 0) {
        id = id.substring(1, id.length);
      }
    
      var el = document.getElementById(id);
      
      if(!el) {
        el = document.querySelectorAll(id)[0];
      }
      //fake the jQuery data API by using our own implementation
      el.data = data(el);
      return el;
    };

    //use querySelectorAll to get a collection of elements
    getAll = function(selector) {
      var el,
          elements = document.querySelectorAll(selector);
      
      if(elements[0] && !elements[0].dataset) {
        for(var i=0, il=elements.length; i < il; i++) {
          el = elements[i];
          el.data = data(el);
        }
      }
      
      elements.each = function(fn) {
        var that = this;
        that.forEach(function(value, index) {
          fn.apply(that, [index, value]);
        });
      };
      
      return elements;
    };
  
  }
  test('value property on binding object creates data-bind attribute', function() {
    var bindings = {
      value: ['name']
    };
    
    ko.unobtrusive.createBindings(bindings);
    
    equals(get('#name').data('bind'), 'value: name');
  });

  test('expanded value property on bindings object creates data-bind attribute', function() {
      var bindings = {
          value: [{name: "foo"}]
      }

      ko.unobtrusive.createBindings(bindings);

      equal(get('#name').data('bind'), 'value: foo');
  }); 

  test('combination of expanded and non-expanded value properties creates data-bind attribute', function() {
      var bindings = {
          value: [{name: "foo"}, "email"]
      }

      ko.unobtrusive.createBindings(bindings);

      equal(get('#name').data('bind'), 'value: foo');
      equal(get('#email').data('bind'), 'value: email');
  });

  test('no empty bindings object does not throw an exception', function() {
      var bindings = {};

      ko.unobtrusive.createBindings(bindings);

      ok(!get('#name').data('bind'));
  });

  test('Pascal-cased fields matches to value bindings in a case-insensitive way', function() {
      var bindings = {
          value: ['twitterHandle']
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#TwitterHandle').data('bind'), 'value: twitterHandle');
  });

  test('fields with name fields instead of id fields creates data-bind attributes', function() {
      var bindings = {
          value: ['occupation']
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('input[name=occupation]').data('bind'), 'value: occupation');
  });

  test('Pascal-cased fields, with name instead of id set, matches to value bindings in a case-insensitive way', function() {
      var bindings = {
          value: ['facebookUrl']
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('input[name=FacebookUrl]').data('bind'), 'value: facebookUrl');
  });

  test('text property on bindings object creates data-bind attribute', function() {
      var bindings = {
          text: ['displayName']
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#displayName').data('bind'), 'text: displayName');
  });

  test('combination of expanded and non-expanded text properties creates data-bind attribute', function() {
      var bindings = {
          text: [{displayName: "foo"}, "displayEmail"]
      }

      ko.unobtrusive.createBindings(bindings);

      equal(get('#displayName').data('bind'), 'text: foo');
      equal(get('#displayEmail').data('bind'), 'text: displayEmail');
  });

  test('options property on bindings object creates data-bind attribute', function() {
      var bindings = {
          options: ['languages']
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#languages').data('bind'), 'options: languages');
  }); 

  test('expanded options property on creates data-bind attribute', function() {
      var bindings = {
          options: [{topics: 'foo'}]
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#topics').data('bind'), 'options: foo');
  });

  test('combination of expanded and non-expanded options properties creates data-bind attribute', function() {
      var bindings = {
          options: ["languages", {topics: "bar"}]
      }

      ko.unobtrusive.createBindings(bindings);

      equal(get('#topics').data('bind'), 'options: bar');
      equal(get('#languages').data('bind'), 'options: languages');
  });

  test('checked property on bindings object creates data-bind attribute', function() {
      var bindings = {
          checked: ['lovesCats']
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#lovesCats').data('bind'), 'checked: lovesCats');
  }); 

  test('expanded checked property on creates data-bind attribute', function() {
      var bindings = {
          checked: [{lovesMeatloaf: 'foo'}]
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#lovesMeatloaf').data('bind'), 'checked: foo');
  });

  test('combination of expanded and non-expanded checked properties creates data-bind attribute', function() {
      var bindings = {
          checked: [{lovesMeatloaf: "bar"}, "lovesCats"]
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#lovesMeatloaf').data('bind'), 'checked: bar');
      equal(get('#lovesCats').data('bind'), 'checked: lovesCats');
  });

  test('custom bindings property creates data-bind attribute', function() {
      var bindings = {
          custom: {
              photo: "attr: {src: photoUrl, alt: name}"
          }
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get("#photo").data('bind'), "attr: {src: photoUrl, alt: name}");
  });
  
  test('existing bindings defined preserves existing attribute values', function() {
      var bindings = {
          value: ['topicToAdd'],
          custom: {
              topicToAdd: 'valueUpdate: "afterkeydown"'
          }
      };

      ko.unobtrusive.createBindings(bindings);

      equal(get('#topicToAdd').data("bind"), 'value: topicToAdd, valueUpdate: "afterkeydown"');
  });


	test('double-quotes binding defined in a template block creates data-bind attribute', function() {
	  var bindings = {
	    click: ['makeOlder']
	  };
	  
	  ko.unobtrusive.createBindings(bindings);
	  
	  equal(!!document.getElementById('olderPerson').text.match('data-bind="click: makeOlder"'), true); 	
	});

	test('single-quotes binding defined in a template block creates data-bind attribute', function() {
	  var bindings = {
	    click: ['makeYounger']
	  };
	  
	  ko.unobtrusive.createBindings(bindings);
	  
	  equal(!!document.getElementById('youngerPerson').text.match('data-bind="click: makeYounger"'), true);    		  
	});

	test('binding defined in a template block with class attributes creates data-bind attribute', function() {
	  var bindings = {
	    click: ['toggle']
	  };
	  
	  ko.unobtrusive.createBindings(bindings);
	  
	  equal(!!document.getElementById('toggle1').text.match('data-bind="click: toggle"'), true);    	  	
	});

	test('bindings defined with same class in a template block and markup creates data-bind attribute', function() {
	  var bindings = {
	    click: ['toggle']
	  };
	  
	  ko.unobtrusive.createBindings(bindings);
	  
	  equal(!!document.getElementById('toggle1').text.match('data-bind="click: toggle"'), true);
	  equal(get('#toggle2btn').data('bind'), "click: toggle");
	});
	
	/*
  test('comprehensive bindings property creates data-bind attributes', function() {
      var bindings = {
          text: [ 'languageToAdd', 'name', 'bio', 'twitterHandle', 'state', 'photoUrl',
                  {languageList: 'languages'} ],
          options: ['languages', 'favoriteTopics'],
          custom: {
              languageToAdd: 'valueUpdate: "afterkeydown"',
              addLanguage: 'enable: languageToAdd().length > 0, click: addLanguage',
              photo: 'attr: {src: photoUrl, alt: name}',
              displayName: 'text: name',
              displayState: 'text: state',
              displayBio: 'text: bio',
              twitterUrl: 'attr: {href: twitterUrl}',
              displayTwitterHandle: 'text: twitterHandle'
          }
      };

      ko.unobtrusive.createBindings(bindings);

      //tests
  });
  */   

  //Add'l Features
  // 1) text binding for spans
  // 2) enabled binding
  // 3) selectionOptions binding
  // 4) other bindings (submit, enable, disable, html, css, attr, style)

})(this);
