node app.js

# browserify content/private/script/main.js -o js.js -t [ babelify --presets [ es2015 react ] --plugins [ minify-simplify ] ]
# browserify content/private/script/main.js -o js.js -t [ babelify --presets [ es2015 react ] ]