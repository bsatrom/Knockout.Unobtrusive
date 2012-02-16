
/*
Knockout.Unobtrusive v0.3 

Copyright (C)2011 Brandon Satrom, Carrot Pants Studios
Distributed Under MIT License

Documentation and Full license Available at:
http://github.com/bsatrom/knockout.unobtrusive

----------------------------
Knockout.Unobtrusive
----------------------------
*/

(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  ko.unobtrusive = {
    createBindings: function(bindings) {
      var bindingKey, bindingValue, createElementBinding, customKey, customValue, getElement, getElementsByClassName, key, quoteAttributes, setAttribute, setElementBinding, value, _results;
      if (!bindings) bindings = ko.unobtrusive.bindings;
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
          if (expr.test(element.className)) match.push(element);
        }
        return match;
      };
      setAttribute = function(el, id, value) {
        var existing;
        existing = el.getAttribute("data-bind");
        if (existing && existing !== value) value = "" + existing + ", " + value;
        return el.setAttribute("data-bind", value);
      };
      quoteAttributes = function(text, id) {
        var attribute, matcher, matchers, _i, _len;
        matchers = ["class", "id", "name"];
        for (_i = 0, _len = matchers.length; _i < _len; _i++) {
          matcher = matchers[_i];
          attribute = "" + matcher + "=" + id;
          if (text.match(attribute)) {
            return text.replace(attribute, "" + matcher + "='" + id + "'");
          }
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
      _results = [];
      for (key in bindings) {
        if (!__hasProp.call(bindings, key)) continue;
        value = bindings[key];
        if (key === "custom") {
          for (customKey in value) {
            if (!__hasProp.call(value, customKey)) continue;
            customValue = value[customKey];
            createElementBinding(customKey, value[customKey]);
          }
          continue;
        }
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (bindingKey in value) {
            if (!__hasProp.call(value, bindingKey)) continue;
            bindingValue = value[bindingKey];
            _results2.push(createElementBinding(value[bindingKey], key));
          }
          return _results2;
        })());
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
