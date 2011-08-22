(function() {
  /*
  Knockout.Unobtrusive v0.2 
  
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
      var checkedKey, clickKey, createElementBinding, customKey, getElement, getElementsByClassName, optionsKey, quoteAttributes, setAttribute, setElementBinding, textKey, value, valueKey, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
      if (!bindings) {
        bindings = ko.unobtrusive.bindings;
      }
      getElement = function(id) {
        var el;
        el = document.getElementById(id) || document.getElementsByName(id)[0];
        if (!el) {
          id = id.charAt(0).toUpperCase() + id.slice(1);
          el = document.getElementById(id) || document.getElementsByName(id)[0];
        }
        return el;
      };
      getElementsByClassName = function(className) {
        var all, element, expr, match, _i, _len;
        if (document.getElementsByClassName) {
          document.getElementsByClassName(className);
        }
        all = document.all || document.getElementsByTagName('*');
        match = [];
        expr = new RegExp("(?:^|\\s)" + className + "(?:\\s|$)");
        for (_i = 0, _len = all.length; _i < _len; _i++) {
          element = all[_i];
          if (expr.test(element.className)) {
            match.push(element);
          }
        }
        return match;
      };
      setAttribute = function(el, id, value) {
        var existing;
        existing = el.getAttribute("data-bind");
        if (existing) {
          value = "" + existing + ", " + value;
        }
        return el.setAttribute("data-bind", value);
      };
      quoteAttributes = function(text, id) {
        if (text.match("class=" + id)) {
          return text.replace("class=" + id, "class='" + id + "'");
        }
        if (text.match("id=" + id)) {
          return text.replace("id=" + id, "id='" + id + "'");
        }
        if (text.match("name=" + id)) {
          return text.replace("name=" + id, "name='" + id + "'");
        }
        return text;
      };
      setElementBinding = function(id, value) {
        var boundEl, boundElement, boundElements, divId, el, script, scripts, tempEl, _i, _j, _len, _len2, _results;
        el = getElement(id);
        if (el) {
          return setAttribute(el, id, value);
        } else {
          scripts = document.getElementsByTagName("script");
          _results = [];
          for (_i = 0, _len = scripts.length; _i < _len; _i++) {
            script = scripts[_i];
            if (!script.type.match("html || x-jquery-tmpl") || !script.text.match(id)) {
              continue;
            }
            divId = "" + script.id + "-div";
            tempEl = document.createElement("div");
            tempEl.setAttribute("style", "visibility:hidden");
            tempEl.id = divId;
            tempEl.innerHTML = script.text;
            document.body.appendChild(tempEl);
            boundEl = getElement(id);
            if (boundEl) {
              setAttribute(boundEl, id, value);
            } else {
              boundElements = getElementsByClassName(id);
              for (_j = 0, _len2 = boundElements.length; _j < _len2; _j++) {
                boundElement = boundElements[_j];
                setAttribute(boundElement, id, value);
              }
            }
            script.text = tempEl.innerHTML;
            script.text = quoteAttributes(script.text, id);
            _results.push(document.body.removeChild(tempEl));
          }
          return _results;
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
      _ref5 = bindings.click;
      for (clickKey in _ref5) {
        if (!__hasProp.call(_ref5, clickKey)) continue;
        value = _ref5[clickKey];
        createElementBinding(bindings.click[clickKey], "click");
      }
      _ref6 = bindings.custom;
      _results = [];
      for (customKey in _ref6) {
        if (!__hasProp.call(_ref6, customKey)) continue;
        value = _ref6[customKey];
        _results.push(createElementBinding(customKey, bindings.custom[customKey]));
      }
      return _results;
    }
  };
  ko.unobtrusive.bindings = {
    value: [],
    text: [],
    options: [],
    checked: [],
    click: [],
    custom: {}
  };
}).call(this);
