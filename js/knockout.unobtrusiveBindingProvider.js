
/*
Knockout.Unobtrusive v0.4 

Copyright (C)2011 Brandon Satrom, Carrot Pants Studios
Distributed Under MIT License

Documentation and Full license Available at:
http://github.com/bsatrom/knockout.unobtrusive

----------------------------
Knockout.Unobtrusive
----------------------------
*/

(function() {

  ko.bindingHelper = (function() {
    var pub, wrap;
    wrap = function(type, binding) {
      return function() {
        var obj;
        obj = {};
        obj[type] = this[binding];
        return obj;
      };
    };
    return pub = {
      createWrapper: function(type, binding) {
        var wrapper;
        wrapper = wrap(type, binding);
        return wrapper;
      }
    };
  })();

  ko.propertyBindingProvider = (function() {
    var applyBinding, bindingsModel, fetchAttributes, getFor, hasFor, inspectAttributes, pub;
    bindingsModel = null;
    hasFor = function(nd) {
      if (nd.getAttribute) {
        return inspectAttributes(nd);
      } else {
        return false;
      }
    };
    getFor = function(nd, ctx) {
      var node, nodeList, result, _i, _len;
      result = {};
      nodeList = fetchAttributes(nd);
      for (_i = 0, _len = nodeList.length; _i < _len; _i++) {
        node = nodeList[_i];
        ko.utils.extend(result, applyBinding(node, ctx));
      }
      return result;
    };
    inspectAttributes = function(nd) {
      var key;
      key = nd.getAttribute("id") || nd.getAttribute("name") || nd.getAttribute("class");
      return key in bindingsModel || false;
    };
    fetchAttributes = function(nd) {
      var classes, id, list, name;
      id = nd.getAttribute("id");
      name = nd.getAttribute("name");
      classes = nd.getAttribute("class");
      list = [];
      if (classes) {
        classes = classes.split(" ");
        list = list.concat(classes);
      }
      if (id) list.push(id);
      if (name) list.push(name);
      return list;
    };
    applyBinding = function(nd, ctx) {
      var binding, bindingAccessor;
      bindingAccessor = bindingsModel[nd];
      if (bindingAccessor) {
        binding = typeof bindingAccessor === "function" ? bindingAccessor.call(ctx.$data) : bindingAccessor;
      }
      return binding;
    };
    return pub = {
      init: function(model) {
        bindingsModel = model;
        return this;
      },
      nodeHasBindings: function(node) {
        return hasFor(node);
      },
      getBindings: function(node, bindingContext) {
        return getFor(node, bindingContext);
      }
    };
  })();

}).call(this);
