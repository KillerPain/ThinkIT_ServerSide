var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/', function(req, res){
    res.json({message: 'Welcome to our API!'})
});

app.use('/api', router);

router.route('/cities')
    .post(function(req, res){
        var city = req.body;
        var celsius = "Weather of the city";
        

        res.json({cityInfo: celsius});
    });


app.listen(port);
console.log('Magic happens on port ' + port);
