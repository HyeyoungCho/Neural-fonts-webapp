var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*
var fs = require('fs');

var ImageTracer = require( __dirname + '/imagetracer_v1.2.1' );

// This example uses https://github.com/arian/pngjs
// , but other libraries can be used to load an image file to an ImageData object.
var PNGReader = require( __dirname + '/PNGReader' );

fs.readFile(

	__dirname + '/el.png', // Input file path

	function( err, bytes ){
		if(err){ throw err; }

		var reader = new PNGReader(bytes);

		reader.parse( function( err, png ){
			if(err){ throw err; }

			// creating an ImageData object
			var myImageData = { width:png.width, height:png.height, data:png.pixels };

			// tracing to SVG string
			var options = { ltres:1  }; // optional
			var svgstring = ImageTracer.imagedataToSVG( myImageData, options );

			// writing to file
			fs.writeFile(
				__dirname + '/el.svg', // Output file path
				svgstring,
				function(err){ if(err){ throw err; } console.log( __dirname + '/test.svg was saved!' ); }
			);

		});// End of reader.parse()

	}// End of readFile callback()

);// End of fs.readFile()
*/
module.exports = app;