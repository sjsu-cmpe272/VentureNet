
/**
 * Module dependencies.
 */

var express = require('express');

var multer = require('multer')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , adoptor = require('./routes/adoptor')
  , shelter = require('./routes/shelter')
  , pet = require('./routes/pet');

var app = express();


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'Hello World',duration:30*60*1000}));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(multer({dest:'./uploads/',}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/login', user.list1);
//app.get('/success', user.list2);
app.post('/ad_signup', adoptor.ad_signup);
app.post('/ad_signin', adoptor.ad_signin);
app.get('/checkLogin', adoptor.checkLogin);
app.post('/sh_signup', shelter.sh_signup);
app.post('/sh_signin', shelter.sh_signin);
app.get('/showshelter', shelter.showshelter);
app.post('/shelterpet', shelter.shelterpet);
app.post('/newreq', shelter.newreq);
app.post('/sendmail', shelter.sendmail);
app.post('/logout', shelter.logout);
app.post('/petsearch', pet.petsearch);
app.post('/petinsert', pet.petinsert);
app.get('/petdetails', pet.petdetails);
app.post('/morepetdet', pet.morepetdet);
app.post('/putinterest',pet.putinterest);
app.post('/shmorepetdet', pet.shmorepetdet);
app.post('/decide', pet.decide);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
