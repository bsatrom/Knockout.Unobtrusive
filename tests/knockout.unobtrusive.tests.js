$(function() {
    test('createBindings with value property on bindings object creates data-bind attribute', function() {
        var bindings = {
            value: ['name']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#name').data('bind') === 'value: name');
    });

    test('createBindings with expanded value property on bindings object creates data-bind attribute', function() {
        var bindings = {
            value: [{name: "foo"}]
        }

        ko.unobtrusive.createBindings(bindings);

        ok($('#name').data('bind') === 'value: foo');
    }); 

    test('createBindings with combination of expanded and non-expanded value properties creates data-bind attribute', function() {
        var bindings = {
            value: [{name: "foo"}, "email"]
        }

        ko.unobtrusive.createBindings(bindings);

        ok($('#name').data('bind') === 'value: foo');
        ok($('#email').data('bind') === 'value: email');
    });

    test('createBindings with no empty bindings object does not throw an exception', function() {
        var bindings = {};

        ko.unobtrusive.createBindings(bindings);

        ok($('#name').data('bind') === undefined);
    });

    test('createBindings on Pascal-cased fields matches to value bindings in a case-insensitive way', function() {
        var bindings = {
            value: ['twitterHandle']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#TwitterHandle').data('bind') === 'value: twitterHandle');
    });

    test('createBindings on fields with name fields instead of id fields creates data-bind attributes', function() {
        var bindings = {
            value: ['occupation']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('input[name=occupation]').data('bind') === 'value: occupation');
    });

     test('createBindings on Pascal-cased fields, with name instead of id set, matches to value bindings in a case-insensitive way', function() {
        var bindings = {
            value: ['facebookUrl']
        };

        ko.unobtrusive.createBindings(bindings);

        equal($('input[name=FacebookUrl]').data('bind'), 'value: facebookUrl');
    });

    test('createBindings with text property on bindings object creates data-bind attribute', function() {
        var bindings = {
            text: ['displayName']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#displayName').data('bind') === 'text: displayName');
    });

    test('createBindings with combination of expanded and non-expanded text properties creates data-bind attribute', function() {
        var bindings = {
            text: [{displayName: "foo"}, "displayEmail"]
        }

        ko.unobtrusive.createBindings(bindings);

        ok($('#displayName').data('bind') === 'text: foo');
        ok($('#displayEmail').data('bind') === 'text: displayEmail');
    });

    test('createBindings with options property on bindings object creates data-bind attribute', function() {
        var bindings = {
            options: ['languages']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#languages').data('bind') === 'options: languages');
    }); 

    test('createBindings with expanded options property on creates data-bind attribute', function() {
        var bindings = {
            options: [{topics: 'foo'}]
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#topics').data('bind') === 'options: foo');
    });

    test('createBindings with combination of expanded and non-expanded options properties creates data-bind attribute', function() {
        var bindings = {
            options: ["languages", {topics: "bar"}]
        }

        ko.unobtrusive.createBindings(bindings);

        ok($('#topics').data('bind') === 'options: bar');
        ok($('#languages').data('bind') === 'options: languages');
    });

    test('createBindings with checked property on bindings object creates data-bind attribute', function() {
        var bindings = {
            checked: ['lovesCats']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#lovesCats').data('bind') === 'checked: lovesCats');
    }); 

    test('createBindings with expanded checked property on creates data-bind attribute', function() {
        var bindings = {
            checked: [{lovesMeatloaf: 'foo'}]
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#lovesMeatloaf').data('bind') === 'checked: foo');
    });

    test('createBindings with combination of expanded and non-expanded checked properties creates data-bind attribute', function() {
        var bindings = {
            checked: [{lovesMeatloaf: "bar"}, "lovesCats"]
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#lovesMeatloaf').data('bind') === 'checked: bar');
        ok($('#lovesCats').data('bind') === 'checked: lovesCats');
    });

    test('createBindings with custom bindings property creates data-bind attribute', function() {
        var bindings = {
            custom: {
                photo: "attr: {src: photoUrl, alt: name}"
            }
        };

        ko.unobtrusive.createBindings(bindings);

        ok($("#photo").data('bind') === "attr: {src: photoUrl, alt: name}");
    });

    test('createBindings with existing bindings defined preserves existing attribute values', function() {
        var bindings = {
            value: ['topicToAdd'],
            custom: {
                topicToAdd: 'valueUpdate: "afterkeydown"'
            }
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#topicToAdd').data("bind") === 'value: topicToAdd, valueUpdate: "afterkeydown"');
    });
    
    test('createBindings with (double-quotes) binding defined in a template block creates data-bind attribute', function() {
    	var bindings = {
    		click: ['makeOlder']
    	};
    	
    	ko.unobtrusive.createBindings(bindings);
    	
    	$('#olderPerson').each(function() {
    		ok(!!this.text.match('data-bind="click: makeOlder"'));    	
    	});    	
    });
    
    test('createBindings with (single-quotes) binding defined in a template block creates data-bind attribute', function() {
    	var bindings = {
    		click: ['makeYounger']
    	};
    	
    	ko.unobtrusive.createBindings(bindings);
    	
    	$('#youngerPerson').each(function() {
    		ok(!!this.text.match("data-bind='click: makeYounger'"));    	
    	});    	
    });
    
    test('createBindings with binding defined in a template block and an extra space in the html (id= "foo" instead of id="foo") creates data-bind attribute', function() {
    	var bindings = {
    		click: ['makeImmortal']
    	};
    	
    	ko.unobtrusive.createBindings(bindings);
    	
    	$('#wizardPerson').each(function() {
    		ok(!!this.text.match("data-bind='click: makeImmortal'"));    	
    	});    	
    });

    /*
	test('createBindings with comprehensive bindings property creates data-bind attributes', function() {
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
});