(function(global) {

  var module, get, getAll, camalizer, data,
      dataMatcher = /data-(.+)/,
      dashAlphaMatcher = /-([a-z])/ig;

  module = QUnit.module;

  module('bindingProvider', {
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
  
  test('value property on binding object binds model property to DOM element with the same id', function() {
    var viewModel = function(name) {
      this.firstName = ko.observable(name);
    };
    
    var bindings = {
      firstName: function() {
        return {
          value: this.firstName
        }
      }
    };
    
    ko.bindingProvider.instance = ko.propertyBindingProvider.init(bindings);
    ko.applyBindings(new viewModel("Allen"));

    equals(document.getElementById('firstName').value, "Allen");
  });

  test('value property on binding object binds model property and responds to underlying model change', function() {
    var viewModel = {
      firstName: ko.observable("Allen")
    };
    
    var bindings = {
      firstName: function() {
        return {
          value: this.firstName
        }
      }
    };
    
    ko.bindingProvider.instance = ko.propertyBindingProvider.init(bindings);
    ko.applyBindings(viewModel);

    viewModel.firstName("Steve");

    equals(document.getElementById('firstName').value, "Steve");
  });

  test('value property on binding object binds model property to all DOM elements with the same class', function() {
    var viewModel = function(name) {
      this.fullName = ko.observable(name);
    };
    
    var bindings = {
      fullName: function() {
        return {
          value: this.fullName
        }
      }
    };
    
    ko.bindingProvider.instance = ko.propertyBindingProvider.init(bindings);
    ko.applyBindings(new viewModel("Steve Gibbons"));
    
    equals(document.getElementsByClassName('fullName')[0].value, "Steve Gibbons");
    equals(document.getElementsByClassName('fullName')[1].value, "Steve Gibbons");
    equals(document.getElementsByClassName('fullName')[2].value, "Steve Gibbons");
  })

  test('value property on binding object binds model property to all DOM elements with id or class name', function() {
    var viewModel = {
      fullName: ko.observable("Amelia Pond")
    };

    var bindings = {
      fullName: function() {
        return {
          value: this.fullName
        }
      }
    };

    ko.bindingProvider.instance = ko.propertyBindingProvider.init(bindings);
    ko.applyBindings(viewModel);

    equals(document.getElementsByClassName('fullName')[0].value, "Amelia Pond");
    equals(document.getElementsByName('fullName')[0].value, "Amelia Pond")
  });

  test('value property with wrapper helper binds model property to DOM elements', function() {
    var viewModel = {

    };

    var bindings = {

    };


  });

  test('mixed properties on binding object binds model property to all DOM elements', function() {
    var viewModel = {
      fullName: ko.observable("Amelia Pond"),
      favoriteColor: ko.observable("Blue")
    };

    var bindings = {
      fullName: function() {
        return {
          value: this.fullName
        }
      },
      favoriteColor: ko.bindingHelper.createWrapper("value", "favoriteColor")
    };

    ko.bindingProvider.instance = ko.propertyBindingProvider.init(bindings);
    ko.applyBindings(viewModel);

    equals(document.getElementsByClassName('fullName')[0].value, "Amelia Pond");
    equals(document.getElementById('favoriteColor').value, "Blue")
  });
})(this);
