//express 기본모듈
var express = require('express');
var http = require('http');
var path = require('path');
// express 미들웨어
var bodyParser =  require('body-parser');
var static = require('serve-static');
//express 객체 생성
var app = express();

//기본 속성 설정
app.set('port',process.env.PORT || 3000);

//body-parser를 이용해 applicatoin/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}))


//body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

app.use(static(path.join(__dirname,'/')));

http.createServer(app).listen(3000,function(){
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});

app.use(function(req, res, next){
    console.log('first middle ware');

    var paramID = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param id : '+paramID+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');

});