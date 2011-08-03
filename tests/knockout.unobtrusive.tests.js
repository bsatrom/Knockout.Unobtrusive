$(function() {
    test('createBindings with text property on bindings object creates data-bind attribute', function() {
        var bindings = {
            text: ['name']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#name').data('bind') === 'value: name');
    });

    test('createBindings with expanded text property on bindings object creates data-bind attribute', function() {
        var bindings = {
            text: [{name: "foo"}]
        }

        ko.unobtrusive.createBindings(bindings);

        ok($('#name').data('bind') === 'value: foo');
    }); 

    test('createBindings with combination of expanded and non-expanded text properties creates data-bind attribute', function() {
        var bindings = {
            text: [{name: "foo"}, "email"]
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

    test('createBindings on Pascal-cased fields matches to input bindings in a case-insensitive way', function() {
        var bindings = {
            text: ['twitterHandle']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('#TwitterHandle').data('bind') === 'value: twitterHandle');
    });

    test('createBindings on fields with name fields instead of id fields creates data-bind attributes', function() {
        var bindings = {
            text: ['occupation']
        };

        ko.unobtrusive.createBindings(bindings);

        ok($('input[name=occupation]').data('bind') === 'value: occupation');
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
            options: [{topics: "bar"}, "languages"]
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

    test('createBindings with comprehensive bindings property creates data-bind attributes', function() {

    
    });
});