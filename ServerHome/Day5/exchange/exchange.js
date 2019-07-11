var XML = "http://api.aoikujira.com/kawase/get.php?code=KRW&amp;format=xml";

var parseString = require('xml2js').parseString;
var request = require('request');
var express = require('express');

request(XML,function(err, response, body){
    if(!err && response.statusCode == 200){
        analyzeXML(body);
    }
})

var app = express();
app.set('port', process.env.PORT || 3000);



function analyzeXML(xml){
    parseString(xml, function(err,obj){
        app.get('/', function(req, res){
            var time = obj.kawase.update;
            var usd = obj.kawase.USD;
            var cny = obj.kawase.CNY;
            var eur = obj.kawase.EUR;
            var gbp = obj.kawase.GBP;
            var aud = obj.kawase.AUD;
            var cad = obj.kawase.CAD;
            var nzd = obj.kawase.NZD;
            

            console.log(obj);
            res.write("<div> <h1>KRW EXCHANGE RATE </h1></div><br>");
            res.write("<div><h3> UPDATE TIME : "+time+"</h3></div><br>");
            res.write("<div> USD : "+usd+"</div>");
            res.write("<div> CNY : "+cny+"</div>");
            res.write("<div> EUR : "+eur+"</div>");
            res.write("<div> GBP : "+gbp+"</div>");
            res.write("<div> AUD : "+aud+"</div>");
            res.write("<div> CAD : "+cad+"</div>");
            res.write("<div> NZD : "+nzd+"</div>");


            res.send();
        });
    });
}


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

