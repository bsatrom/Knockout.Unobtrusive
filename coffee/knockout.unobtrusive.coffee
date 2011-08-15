###
Knockout.Unobtrusive v0.1

Copyright (C)2011 Brandon Satrom, Carrot Pants Studios
Distributed Under MIT License

Documentation and Full license Available at:
http://github.com/bsatrom/knockout.unobtrusive

----------------------------
Knockout.Unobtrusive
----------------------------
###
ko.unobtrusive = {
  createBindings: (bindings) ->
    if not bindings
      bindings = ko.unobtrusive.bindings
      
    getElement = (id) ->
      el = document.getElementById(id) or document.getElementsByName(id)[0]
      
      if not el
        id = id.charAt(0).toUpperCase() + id.slice 1
        el = document.getElementById(id) or document.getElementsByName(id)[0]
        
      return el
    
    setElementBinding = (id, value) ->
      el = getElement id;
      if el
        existing = el.getAttribute "data-bind"
        
        if existing
          value = "#{existing}, #{value}"
          
        el.setAttribute "data-bind", value
      else
      	el = $('script[type$=html], script[type$=x-jquery-tmpl]')
      	
      	if(el)
      	  el.each ->
      	  	while @text.match "= "
      	  		@text = @text.replace "= ", "="
      	  	boundText = @text.replace 'id="' + id + '"', 'data-bind="' + value + '"'
      	  	
      	  	if boundText is @text
      	  	  boundText = @text.replace "id='#{id}'", "data-bind='#{value}'"
      	  	@text = boundText
    
    createElementBinding = (element, koBinding) ->
      if typeof element is "object"
        for own key, value of element
          setElementBinding key, "#{koBinding}: #{element[key]}"
      else
        if koBinding.indexOf(":") > 0
          setElementBinding element, koBinding
        else
          setElementBinding element, "#{koBinding}: #{element}"
    
    for own valueKey, value of bindings.value
      createElementBinding bindings.value[valueKey], "value"
 
    for own textKey, value of bindings.text
      createElementBinding bindings.text[textKey], "text"
      
    for own optionsKey, value of bindings.options
      createElementBinding bindings.options[optionsKey], "options" 
    
    for own checkedKey, value of bindings.checked
      createElementBinding bindings.checked[checkedKey], "checked"
    
    for own clickKey, value of bindings.click
    	createElementBinding bindings.click[clickKey], "click"    
    
    for own customKey, value of bindings.custom
      createElementBinding customKey, bindings.custom[customKey]
}

ko.unobtrusive.bindings = {
  value: []
  text: []
  options: []
  checked: []
  click: []
  custom: {}
}