fs = require 'fs'
path = require 'path'
CoffeeScript = require 'coffee-script'
wingrr = require 'wingrr'
uglify = require "uglify-js"
jsp = uglify.parser
pro = uglify.uglify
file = 'knockout.unobtrusive'
source = 'coffee'
output = 'js'
coffeeImg = "https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee.png"
successImg = "https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee-success.png"
failImg = "https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee-error.png"

#wingrr.debug = true
wingrr.registerApplication "Cake", {image:  coffeeImg}

clean = ->
	files = fs.readdirSync "#{output}"
	(fs.unlinkSync "#{output}/" + file) for file in files
	
makeUgly = (err, str, file) ->
	console.log err
	ast = jsp.parse str
	ast = pro.ast_mangle ast
	ast = pro.ast_squeeze ast
	code = pro.gen_code ast
	fs.writeFile (file.replace /\.js/, '.min.js'), code

task 'cleanup', 'cleans up the libs before a release', ->
	clean()
	
task 'build', "builds #{file}", ->
    console.log "building #{file} from coffeescript"
    code = fs.readFileSync "#{source}/#{file}.coffee", 'utf8'
    fs.writeFile "#{output}/#{file}.js", CoffeeScript.compile code
	
task 'minify', "minifies #{file} to a release build", ->
	#invoke 'build'
	console.log "minifying #{file}"
	files = fs.readdirSync output
	files = ("#{output}/" + f for f in files when f.match(/\.js$/))
	(fs.readFile f, 'utf8', (err, data) -> makeUgly err, data, f) for f in files
	
task 'release', "creates a release of #{file}", ->
    invoke 'cleanup'
    invoke 'build'
    invoke 'tests'
    invoke 'minify'
    wingrr.notify 'Release created', {title: 'Ko.Unobtrusive Release', image: successImg}
    
task 'tests', "run tests for #{file}", ->
    console.log 'Time for some tests! '
    runner = require 'qunit'
    sys = require 'sys'
    colors = require 'colors'
    test = 
      deps: ["./tests/test-env.js"]
      code: "./#{output}/#{file}.js",
      tests: "./tests/#{file}.tests.js"

    runner.options.summary = false
      
    report = (r) ->
      if r.errors
      	msg = "Uh oh, there were errors"
      	sys.puts msg.bold.red
      	wingrr.notify msg, {title: 'Ko.Unobtrusive Tests', image: failImg}        
      else
      	msg = 'All test pass'
      	sys.puts msg.green
      	wingrr.notify msg, {title: 'Knockout.Unobtrusive Tests', image: successImg}
        
    runner.run test, report

task 'watch', 'Watch prod source files and build changes', ->
		msg = "Watching for changes in #{source}"
		console.log msg
		wingrr.notify msg, {title: 'Ko.Unobtrusive Watch', image: successImg}
		
		fs.watch "#{source}/#{file}.coffee", (event, file) ->
        if event is "change"
            console.log "Saw change in #{source}/#{file}.coffee"
            try
              invoke 'build'
              console.log 'build complete'
              invoke 'tests'
            catch e
            	msg = 'Error with CoffeeScript build'
            	wingrr.notify msg, {title: 'Ko.Unobtrusive Watch', image: failImg}
            	console.log msg
            	console.log e
