module = QUnit.module;

module('createBindings', {
  teardown: function() {
    if(!QUnit.reset) {
      rebuildDom();
    }
  }
});

var get = (function() {
  var camalizer, dataset,
      dataMatcher = /data-(.+)/,
      dashAlphaMatcher = /-([a-z])/ig;
  
  camalizer = function(x, letter) {
    return letter.toUpperCase();
  };
  
  dataset = function(el) {
    var attribute,
        attributes = el.attributes,
        data = {};
    
    for(var i = 0, il = attributes.length; i < il; i++) {
      attribute = attributes[i];
      if(dataMatcher.test(attribute.name)) {
        data[attribute.name.match(dataMatcher)[1].replace(dashAlphaMatcher, camalizer)] = attribute.value;
      }
    }
    
    return data;
  };
  
  return function(id) {
    var el = document.getElementById(id);
    if(!el.dataset) {
      el.dataset = dataset(el);
    }
    return el;
  };
})();

test('value property on binding object creates data-bind attribute', function() {
  var bindings = {
    value: ['name']
  };
  
  ko.unobtrusive.createBindings(bindings);
  
  equals(get('name').dataset['bind'], 'value: name');
});

test('expanded value property on bindings object creates data-bind attribute', function() {
    var bindings = {
        value: [{name: "foo"}]
    }

    ko.unobtrusive.createBindings(bindings);

    equal(get('name').dataset['bind'], 'value: foo');
}); 

/*

test('combination of expanded and non-expanded value properties creates data-bind attribute', function() {
    var bindings = {
        value: [{name: "foo"}, "email"]
    }

    ko.unobtrusive.createBindings(bindings);

    equal($('#name').data('bind'), 'value: foo');
    equal($('#email').data('bind'), 'value: email');
});

test('no empty bindings object does not throw an exception', function() {
    var bindings = {};

    ko.unobtrusive.createBindings(bindings);

    equal($('#name').data('bind'), undefined);
});

test('Pascal-cased fields matches to value bindings in a case-insensitive way', function() {
    var bindings = {
        value: ['twitterHandle']
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#TwitterHandle').data('bind'), 'value: twitterHandle');
});

test('fields with name fields instead of id fields creates data-bind attributes', function() {
    var bindings = {
        value: ['occupation']
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('input[name=occupation]').data('bind'), 'value: occupation');
});

 test('Pascal-cased fields, with name instead of id set, matches to value bindings in a case-insensitive way', function() {
    var bindings = {
        value: ['facebookUrl']
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('input[name=FacebookUrl]').data('bind'), 'value: facebookUrl');
});

test('text property on bindings object creates data-bind attribute', function() {
    var bindings = {
        text: ['displayName']
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#displayName').data('bind'), 'text: displayName');
});

test('combination of expanded and non-expanded text properties creates data-bind attribute', function() {
    var bindings = {
        text: [{displayName: "foo"}, "displayEmail"]
    }

    ko.unobtrusive.createBindings(bindings);

    equal($('#displayName').data('bind'), 'text: foo');
    equal($('#displayEmail').data('bind'), 'text: displayEmail');
});

test('options property on bindings object creates data-bind attribute', function() {
    var bindings = {
        options: ['languages']
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#languages').data('bind'), 'options: languages');
}); 

test('expanded options property on creates data-bind attribute', function() {
    var bindings = {
        options: [{topics: 'foo'}]
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#topics').data('bind'), 'options: foo');
});

test('combination of expanded and non-expanded options properties creates data-bind attribute', function() {
    var bindings = {
        options: ["languages", {topics: "bar"}]
    }

    ko.unobtrusive.createBindings(bindings);

    equal($('#topics').data('bind'), 'options: bar');
    equal($('#languages').data('bind'), 'options: languages');
});

test('checked property on bindings object creates data-bind attribute', function() {
    var bindings = {
        checked: ['lovesCats']
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#lovesCats').data('bind'), 'checked: lovesCats');
}); 

test('expanded checked property on creates data-bind attribute', function() {
    var bindings = {
        checked: [{lovesMeatloaf: 'foo'}]
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#lovesMeatloaf').data('bind'), 'checked: foo');
});

test('combination of expanded and non-expanded checked properties creates data-bind attribute', function() {
    var bindings = {
        checked: [{lovesMeatloaf: "bar"}, "lovesCats"]
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#lovesMeatloaf').data('bind'), 'checked: bar');
    equal($('#lovesCats').data('bind'), 'checked: lovesCats');
});

test('custom bindings property creates data-bind attribute', function() {
    var bindings = {
        custom: {
            photo: "attr: {src: photoUrl, alt: name}"
        }
    };

    ko.unobtrusive.createBindings(bindings);

    equal($("#photo").data('bind'), "attr: {src: photoUrl, alt: name}");
});

test('existing bindings defined preserves existing attribute values', function() {
    var bindings = {
        value: ['topicToAdd'],
        custom: {
            topicToAdd: 'valueUpdate: "afterkeydown"'
        }
    };

    ko.unobtrusive.createBindings(bindings);

    equal($('#topicToAdd').data("bind"), 'value: topicToAdd, valueUpdate: "afterkeydown"');
});

test('double-quotes binding defined in a template block creates data-bind attribute', function() {
  var bindings = {
    click: ['makeOlder']
  };
  
  ko.unobtrusive.createBindings(bindings);
  
  $('#olderPerson').each(function() {
    ok(!!this.text.match('data-bind="click: makeOlder"'));    	
  });    	
});

test('single-quotes binding defined in a template block creates data-bind attribute', function() {
  var bindings = {
    click: ['makeYounger']
  };
  
  ko.unobtrusive.createBindings(bindings);
  
  $('#youngerPerson').each(function() {
    ok(!!this.text.match("data-bind='click: makeYounger'"));    	
  });    	
});

test('binding defined in a template block and an extra space in the html (id= "foo" instead of id="foo") creates data-bind attribute', function() {
  var bindings = {
    click: ['makeImmortal']
  };
  
  ko.unobtrusive.createBindings(bindings);
  
  $('#wizardPerson').each(function() {
    ok(!!this.text.match("data-bind='click: makeImmortal'"));    	
  });    	
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