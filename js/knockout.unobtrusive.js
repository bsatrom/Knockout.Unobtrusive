(function() {
  /*
  Knockout.Unobtrusive v0.1
  
  Copyright (C)2011 Brandon Satrom, Carrot Pants Studios
  Distributed Under MIT License
  
  Documentation and Full license Available at:
  http://github.com/bsatrom/knockout.unobtrusive
  
  ----------------------------
  Knockout.Unobtrusive
  ----------------------------
  */
  var __hasProp = Object.prototype.hasOwnProperty;
  ko.unobtrusive = {
    createBindings: function(bindings) {
      var checkedKey, createElementBinding, customKey, getElement, optionsKey, setElementBinding, templateKey, textKey, value, valueKey, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
      if (!bindings) {
        bindings = ko.unobtrusive.bindings;
      }
      getElement = function(id) {
        var el;
        el = document.getElementById(id) || document.getElementsByName(id)[0];
        if (!el) {
          id = id.charAt(0).toUpperCase() + id.slice(1);
          el = document.getElementById(id);
        }
        return el;
      };
      setElementBinding = function(id, value) {
        var el, existing;
        el = getElement(id);
        if (el) {
          existing = el.getAttribute("data-bind");
          if (existing) {
            value = "" + existing + ", " + value;
          }
          return el.setAttribute("data-bind", value);
        }
      };
      createElementBinding = function(element, koBinding) {
        var key, value, _results;
        if (typeof element === "object") {
          _results = [];
          for (key in element) {
            if (!__hasProp.call(element, key)) continue;
            value = element[key];
            _results.push(setElementBinding(key, "" + koBinding + ": " + element[key]));
          }
          return _results;
        } else {
          if (koBinding.indexOf(":") > 0) {
            return setElementBinding(element, koBinding);
          } else {
            return setElementBinding(element, "" + koBinding + ": " + element);
          }
        }
      };
      _ref = bindings.value;
      for (valueKey in _ref) {
        if (!__hasProp.call(_ref, valueKey)) continue;
        value = _ref[valueKey];
        createElementBinding(bindings.value[valueKey], "value");
      }
      _ref2 = bindings.text;
      for (textKey in _ref2) {
        if (!__hasProp.call(_ref2, textKey)) continue;
        value = _ref2[textKey];
        createElementBinding(bindings.text[textKey], "text");
      }
      _ref3 = bindings.options;
      for (optionsKey in _ref3) {
        if (!__hasProp.call(_ref3, optionsKey)) continue;
        value = _ref3[optionsKey];
        createElementBinding(bindings.options[optionsKey], "options");
      }
      _ref4 = bindings.checked;
      for (checkedKey in _ref4) {
        if (!__hasProp.call(_ref4, checkedKey)) continue;
        value = _ref4[checkedKey];
        createElementBinding(bindings.checked[checkedKey], "checked");
      }
      _ref5 = bindings.custom;
      for (customKey in _ref5) {
        if (!__hasProp.call(_ref5, customKey)) continue;
        value = _ref5[customKey];
        createElementBinding(customKey, bindings.custom[customKey]);
      }
      _ref6 = bindings.template;
      _results = [];
      for (templateKey in _ref6) {
        if (!__hasProp.call(_ref6, templateKey)) continue;
        value = _ref6[templateKey];
        _results.push(createElementBinding(bindings.template[templateKey], "template"));
      }
      return _results;
    }
  };
  ko.unobtrusive.bindings = {
    value: [],
    text: [],
    options: [],
    checked: [],
    custom: {},
    template: []
  };
}).call(this);
