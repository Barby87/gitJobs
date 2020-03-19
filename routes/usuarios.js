var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // cargando vista usuarios.ejs
  res.render('usuarios', { title: 'Github Empleos!!!!' });
});

module.exports = router;
