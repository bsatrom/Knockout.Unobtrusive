# Knockout.Unobtrusive

Unobtrusive model binding syntax for [KnockoutJS] (http://knockoutjs.com)

### Prerequisites

* KnockoutJs v1.2.1 or higher

This is a plugin for KnockoutJS and is built and tested against Knockout v1.2.1. If you experience any issues in working with this plugin in your applications, or notice a breaking change to a future version of Knockout that affects this plugin, please let me know on the [Issues tab] (https://github.com/bsatrom/Knockout.Unobtrusive/issues) of this project.

## Getting Started

Knockout.Unobtrusive is all about moving your binding syntax from HTML into your JavaScript. If you like the declarative "data-bind" syntax of Knockout, and see no reason to muck with it, this plugin is probably not for you. No worries, my feelings won't be hurt.

If, however, the phrase "Unobtrusive JavaScript" is something of a personal mission for you, welcome to Knockout.Unobtrusive, a simple plugin that allows you to use the best JavaScript MVVM library around with script-based binding definitions. 

Getting started is simple. Just download [KnockoutJS] (http://knockoutjs.com) and this plugin and include the following script references in your page.

````
<script src="knockout-1.2.1.js"></script>
<script src="knockout.unobtrusive.js"></script>
````

### Moving From data-bind to A Bindings Object

Once you've included a reference to Knockout.Unobtrusive in your page, you can begin moving the bindings contained in data-bind attributes in your markup into your JavaScript. If you're creating new markup, you can forego using data-bind attributes and use a bindings object instead. Consider the following markup:

````
 <fieldset>
   <legend>Speaker Info</legend>
   Name: <input type="text" data-bind="value: name" /> <br/>
   Bio: <input type="text" data-bind="value: bio" /> <br />
   Twitter Handle: <input type="text" data-bind="value: twitterHandle" /> <br />
   Photo Url: <input type="text" data-bind="value: photoUrl" />    
</fieldset>
````

For each element with a data-bind attribute, we'll need to create an entry in a bindings object that knockout.unobtrusive can then use to generate those bindings on our behalf. For the markup above, the object may look something like the following:

````
var bindings = {
  text: ['name', 'bio', 'twitterHandle', 'photoUrl']
};
````

Once your created this object, you can remove the data-bind attributes on your markup. The only requirement on your markup that Knockout.Unobtrusive assumes is that you've assigned id or name values to each element, consistent with the bindings you define. As such, the bindings object above assumes you have elements with id or name values of 'name', 'bio', 'twitterHandle' and 'photoUrl,' as below:

````
 <fieldset>
   <legend>Speaker Info</legend>
   Name: <input type="text" id="name" /> <br/>
   Bio: <input type="text" id="bio" /> <br />
   Twitter Handle: <input id="twitterHandle" type="text" /> <br />
   Photo Url: <input id="photoUrl" type="text" />    
</fieldset>
````

Once you've created a bindings object and adjusted your markup accordingly, you'll need to call knockout.uobtrusive's createBindings() method *before* your call Knockout's ko.applyBindings() method. The createBindings method accepts a bindings object:

````
ko.unobtrusive.createBindings(bindings);
ko.applyBindings(viewModel);
````

When called with a valid bindings object, createBindings() will create all of the data-bind attributes that KnockoutJS depends on.

### The Prototype Bindings Object

For reference, knockout.unobtrusive contains a prototype bindings object called ko.unobtrusive.bindings. If ko.unobtrusive.createBindings is called without a bindings object, this object will be used instead. If you wish, you can define bindings on this object directly, instead of using a custom object.

````
ko.unobtrusive.bindings.text = ['name', 'bio', 'twitterHandle', 'photoUrl']
```` 

The prototype bindings object also serves as documentation for the types of binding options currently supported by the Knockout.Unobtrusive plugin. As of v0.1, these options are:

* ````text```` - Generates the syntax needed for Knockout's [text binding] (http://knockoutjs.com/documentation/text-binding.html), ````data-bind="value: foo"````
* ````options```` - Generates the syntax needed for Knockout's [options binding] (http://knockoutjs.com/documentation/options-binding.html), ````data-bind="options: foo"````

* ````checked```` - Generates the syntax needed for Knockout's [checked binding] (http://knockoutjs.com/documentation/checked-binding.html), ````data-bind="checked: foo"````
* ````custom```` - Can be used for any bindings not yet provided by the plugin, or for when setting multiple bindings on a single element, for example ````data-bind="enable: isValid(), click: addLanguage"````

### Binding Conventions

* Plugin selects DOM (View) elements by id, then name - When creating binding definitions, id and name values can be used. The plugin will first attempt to select elements by id, then by name.
* Camel-cased ViewModel properties match to Pascal-cased DOM (View) elements - If the plugin is unable to find elements by a same case search for id and name, the first letter of the binding name will be capitalized and re-selected from the DOM
* ViewModel properties with Matching DOM (View) elements can be minimized in the binding declaration. Non-matching elements can be expanded in the same declaration. For example:

````
var bindings = {
  text: [{name: "foo"}, "email"]
}
````

* Binding declarations will concatenate the data-bind value when declared in multiple locations. For example, the following binding:

````
var bindings = {
    text: ['topicToAdd'],
    custom: {
        topicToAdd: 'valueUpdate: "afterkeydown"'
    }
};
````

Will produce this data-bind attribute:

````
dat-bind='value: topicToAdd, valueUpdate: "afterkeydown"'
````

### Coming Soon..

* ````enabled```` binding
* Working with data-bind attributes defined in template blocks
* ````selectedOptions```` binding
* other bindings, including ````click````, ````submit````, ````disable````, ````html````, ````css````, ````attr````, ````style````, 

## It's Early Yet...

Knockout.Unobtrusive is still in the early stages of development, and I don't claim to fully support every conceivable scenario for which you might use it. I'm open to both pull requests and issue reports, so feel free to contribute to either.

# MIT License

Copyright (c) 2001 Brandon Satrom, Carrot Pants Studios

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.