var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('viewengine', 'handlebars');
app.set('port', process.argv[2]);
const {spawn} = require('child_process');

app.get('/',function(req,res){
  res.render('home.handlebars');
});

//the python code I wrote myself
//to run the python file in node I
//adapted code from https://medium.com/swlh/run-python-script-from-node-js-and-send-data-to-browser-15677fcf199f
app.get('/blackFlag',function(req,res){
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['blackflag.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.render('blackFlag.handlebars', {data: dataToSend});
  });
});

app.get('/hysteria',function(req,res){
  res.render('hysteria.handlebars');
});

app.get('/jailbreak',function(req,res){
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['jailbreak.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.render('jailbreak.handlebars', {data: dataToSend});
  });
});

app.get('/manorHill',function(req,res){
  res.render('manorHill.handlebars');
});

app.get('/sapwoodCellars',function(req,res){
  res.render('sapwoodCellars.handlebars');
});

app.get('/survey',function(req,res){
  res.render('survey.handlebars');
});

app.use(function(req,res){
  res.status(404);
  res.render('404.handlebars');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500.handlebars');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
