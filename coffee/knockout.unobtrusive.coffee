###
Knockout.Unobtrusive v0.2 

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
    
    #Not all browsers support document.getElementsByClassName, so I rolls my own
    getElementsByClassName = (className) ->
    	if document.getElementsByClassName
    		document.getElementsByClassName className
    			
    	all = document.all or document.getElementsByTagName('*')
    	match = []
    	expr = new RegExp "(?:^|\\s)#{className}(?:\\s|$)"
    	
    	for element in all
    		if expr.test(element.className)
    			match.push(element)
    			
    	match
      
    setAttribute = (el, id, value) ->
    		existing = el.getAttribute "data-bind"
    		
    		if existing and existing isnt value    		
    			value = "#{existing}, #{value}"
    		
    		el.setAttribute "data-bind", value
  	
    
    quoteAttributes = (text, id) ->      		
    	matchers = ["class", "id", "name"]
    
    	for matcher in matchers
    		attribute = "#{matcher}=#{id}"
    		if text.match attribute
    			return text.replace attribute, "#{matcher}='#{id}'"
    			    		    	
    	return text
    
    setElementBinding = (id, value) ->
      el = getElement id;
      if el
        setAttribute el, id, value
      else
      	scripts = document.getElementsByTagName "script"
      	for script in scripts
      		if not script.type.match("html || x-jquery-tmpl") or not script.text.match(id)
      			continue
      		
      		divId = "#{script.id}-div"
      			
      		tempEl = document.createElement "div"
      		tempEl.setAttribute "style", "visibility:hidden"
      		tempEl.id = divId
      		tempEl.innerHTML = script.text
      		document.body.appendChild tempEl
      			
      		boundEl = getElement id
      			
      		if boundEl
      			setAttribute boundEl, id, value
      		else
      			boundElements = getElementsByClassName(id)      			
      			
      			for boundElement in boundElements
      				setAttribute boundElement, id, value
      			
      		script.text = tempEl.innerHTML      				
      		
      		#make sure that attributes are surrounded by quotes.
      		script.text = quoteAttributes(script.text, id)
      		document.body.removeChild(tempEl)
    
    createElementBinding = (element, koBinding) ->
      if typeof element is "object"
        for own key, value of element
          setElementBinding key, "#{koBinding}: #{element[key]}"
      else
        if koBinding.indexOf(":") > 0
          setElementBinding element, koBinding
        else
          setElementBinding element, "#{koBinding}: #{element}"
  				
    for own key, value of bindings
    	if key is "custom"
    		for own customKey, customValue of value
      		createElementBinding customKey, value[customKey]  
    		
      	continue
          
    	for own bindingKey, bindingValue of value
    		createElementBinding value[bindingKey], key
}
	
ko.unobtrusive.bindings = {
  value: []
  text: []
  options: []
  checked: []
  click: []
  custom: {}
}