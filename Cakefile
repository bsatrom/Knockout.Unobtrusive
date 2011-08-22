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

#wingrr.debug = true
wingrr.registerApplication "Cake", {image:  "https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee.png"}

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
	invoke 'build'
	console.log "minifying #{file}"
	files = fs.readdirSync 'js'
	files = ("#{output}/" + f for f in files when f.match(/\.js$/))
	(fs.readFile f, 'utf8', (err, data) -> makeUgly err, data, f) for f in files
	
task 'release', "creates a release of #{file}", ->
    invoke 'cleanup'
    invoke 'build'
    invoke 'tests'
    invoke 'minify'
    growl.notify 'Release created', {title: 'Knockout.Unobtrusive Release', image: "https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee-success.png"}
    
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
        sys.puts 'Uh oh there were errors'.bold.red    
  
        wingrr.notify 'Uh oh there were errors', {title: 'Knockout.Unobtrusive Tests', image: 'https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee-error.png'}        
      else
        sys.puts 'All test pass'.green
        wingrr.notify 'All tests pass', {title: 'Knockout.Unobtrusive Tests', image: "https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee-success.png"}
        
    runner.run test, report

task 'watch', 'Watch prod source files and build changes', ->
    console.log "Watching for changes in #{source}"
    wingrr.notify "Watching for changes in #{source}", {title: 'Knockout.Unobtrusive Watch', image: "https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee-success.png"}

    fs.watchFile "#{source}/#{file}.coffee", (curr, prev) ->
        if +curr.mtime isnt +prev.mtime
            console.log "Saw change in #{source}/#{file}.coffee"
            try
              invoke 'build'
              console.log 'build complete'
              invoke 'tests'
            catch e
            	wingrr.notify 'Error with CoffeeScript build', {title: 'Knockout.Unobtrusive Watch', image: 'https://github.com/bsatrom/Knockout.Unobtrusive/raw/master/build/img/coffee-error.png'}
            	console.log 'Oh snap, something went wrong!'
            	console.log e
