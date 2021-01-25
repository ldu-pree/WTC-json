var express = require('express');
const colors = require('colors');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var config = require('../config/config.json');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();
var ssn;
router.use(session({secret:'XASDASDA'}));
app.use(session({secret:'XASDASDA'}));
module.exports = router;
app.set('views', __dirname + './');
app.engine('pug', require('pug').__express);
app.set("view engine", "pug");
router.use('/images', express.static(__dirname + '/images'));

router.get('/Home', function(req, res) {
    res.render('home.pug');
})
router.get('/home', function(req, res) {
    res.render('home.pug');
})
router.get('/', function(req, res) {
    res.render('home.pug');
})