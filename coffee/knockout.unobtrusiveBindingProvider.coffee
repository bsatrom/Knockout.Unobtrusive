###
Knockout.Unobtrusive v0.4 

Copyright (C)2011 Brandon Satrom, Carrot Pants Studios
Distributed Under MIT License

Documentation and Full license Available at:
http://github.com/bsatrom/knockout.unobtrusive

----------------------------
Knockout.Unobtrusive
----------------------------
###

ko.unobtrusive = {}

ko.unobtrusive.bindingProvider = do ->
	bindingsModel = null
	hasFor = (nd) ->
		if nd.getAttribute then inspectAttributes(nd) else false 
	
	getFor = (nd, ctx) ->
		result = {}
		nodeList = fetchAttributes nd
		
		ko.utils.extend(result, applyBinding(node, ctx)) for node in nodeList

		result

	inspectAttributes = (nd) ->
		key = nd.getAttribute("id") or nd.getAttribute("name") or nd.getAttribute("class")

		return key of bindingsModel or false

	fetchAttributes = (nd) ->
		id = nd.getAttribute("id")
		name = nd.getAttribute("name")
		classes = nd.getAttribute("class")
		list = []

		if classes
			classes = classes.split(" ")
			list.concat classes

		if id then list.push id
		if name then list.push name

		list

	applyBinding = (nd, ctx) ->
		bindingAccessor = bindingsModel[nd]

		if (bindingAccessor)
			binding = if typeof bindingAccessor is "function" then bindingAccessor.call ctx.$data else bindingAccessor  
		
		binding
	pub =
		init: (model) -> 
			bindingsModel = model
			@

		nodeHasBindings: (node) -> hasFor node
		
		getBindings: (node, bindingContext) -> getFor node, bindingContext