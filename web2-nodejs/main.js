// Node.js에서는 require 메서드를 통해 외부 모듈을 가져올 수 있다. → require('파일 경로');
// Node.js에는 HTTP라는 내장 모듈이 있어 Node.js가 HTTP를 통해 데이터를 전송할 수 있다.
var http = require('http');
// Node.js 파일 시스템 모듈을 사용하면 컴퓨터에서 파일 시스템으로 작업 할 수 있습니다.
var fs = require('fs');
// URL 모듈은 웹 주소를 읽을 수있는 부분으로 나눕니다.
var url = require('url');
// The createServer method creates a server on your computer : 다음 메서드는 사용자의 컴퓨터에 서버를 생성한다.
// The http.createServer() method turns your computer into an HTTP server. : The http.createServer() : 메서드는 사용자의 컴퓨터를 http 서버 환경으로 바꾸어 준다.
var app = http.createServer(function(request,response){
    var _url = request.url; // 브라우저의 url → 속성값, /이하의 queryString 부분만을 가리킨다.
    // url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
    // url.parse : url 문자열(urlStr)을 url 객체로 변환하여 리턴한다.
    // parseQueryString과 slashesDenoteHost는 기본값으로 false. 
    // parseQueryString → true : url 객체의 query 속성을 객체 형식으로 가져옴(querystring 모듈을 사용)
    // console.log(_url);
    // queryString 부분과 관련 → 이 부분을 바꿔주어서 리로드 없이 페이지의 내용이 바뀔 수 있도록 함.
    // <a href=""> 부분의 queryString을 가져오게 됨
    var queryData = url.parse(_url, true).query; // /?id=HTML
    var title = queryData.id; // HTML
    // 만약 _url의 값이 '/' 이면 '/index.html'로 바꾼다.
    // → home으로 갔을 때, 아래의 if문이 실행된다.
    // if(_url == '/'){
    //     // _url = '/index.html';
    //     title = 'Welcome';
    // }
    // if(_url == '/favicon.ico'){
    //     // writeHead(statusCode, object) : request에 응답 헤더 작성해서 보냄
    //     return response.writeHead(404);
    // }

    console.log(url.parse(_url, true).pathname);
    // url 정보를 분석해서 사용자가 쉽게 정보를 가져다 쓸 수 있도록 함.
    // path : queryString을 포함함
    // pathname : 실제로 queryString이 있다 하더라도, queryString을 제외한 주소를 보여줌

    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        var template = `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    <ul>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=javaScript">JavaScript</a></li>
    </ul>
    <h2>${title}</h2>
    <p>${description}</p>
    </body>
    </html>
    `;

    // queryString으로 바꾸고 싶은 부분 : title, h2
    
    // queryData.id : queryString의 아이디 값
    // response.end() : 응답본문 작성
    response.writeHead(200);
    response.end(template);
    })
});
// 3000번 포트에 nodejs 웹 서버를 실행시키겠다.
app.listen(3000);



// Not found 오류 구현
// 기능1 : queryString이 없는 페이지로 들어왔을 때, welcome 페이지를 띄워줌
// 기능2 : 존재하지 않는 다른 페이지로 들어왔을 경우, 사용자에서 파일을 찾을 수 없다는 메세지를 띄어줌