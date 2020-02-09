// Node.js에서는 require 메서드를 통해 외부 모듈을 가져올 수 있다. → require('파일 경로');
// Node.js에는 HTTP라는 내장 모듈이 있어 Node.js가 HTTP를 통해 데이터를 전송할 수 있다.
var http = require("http");
// Node.js 파일 시스템 모듈을 사용하면 컴퓨터에서 파일 시스템으로 작업 할 수 있습니다.
var fs = require("fs");
// URL 모듈은 웹 주소를 읽을 수있는 부분으로 나눕니다.
var url = require("url");
// qs 변수에 'querystring'이라는, nodejs가 가지고 있는 모듈을 가져옴
var qs = require("querystring");
// The createServer method creates a server on your computer : 다음 메서드는 사용자의 컴퓨터에 서버를 생성한다.
// The http.createServer() method turns your computer into an HTTP server. : The http.createServer() : 메서드는 사용자의 컴퓨터를 http 서버 환경으로 바꾸어 준다.
var template = require("./lib/template.js");

var path = require("path");
var sanitizeHtml = require("sanitize-html");
// 사용자로부터 경로가 들어온 모든 곳에 내용을 바꿔주어야 한다.
// *** 사용자가 입력한 정보(외부에서 들어온 정보)가 바깥으로 나갈때 오염될 수 있기 때문에 의심을 해봐야 함.
// 외부에서 들어온 정보 파악하기 : readdir, readFile

// Node.js에는 HTTP라는 내장 모듈이 있어 Node.js가 HTTP를 통해 데이터를 전송할 수 있다.
// http 모듈을 가져온다.
// request : 웹 브라우저로부터 들어온 요청에 대한 여러 가지 정보를 담고 있는 객체
// response : 구현한 함수를 통해 사용자에게 전송하고자 하는 정보(코드값이나 실제내용)를 담고 있는 객체
var app = http.createServer(function (request, response) {
  var _url = request.url; // 브라우저의 url → 속성값, /이하의 queryString 부분만을 가리킨다.
  // url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
  // url.parse : url 문자열(urlStr)을 url 객체로 변환하여 리턴한다.
  // parseQueryString과 slashesDenoteHost는 기본값으로 false.
  // parseQueryString → true : url 객체의 query 속성을 객체 형식으로 가져옴(querystring 모듈을 사용)
  // console.log(_url);
  // queryString 부분과 관련 → 이 부분을 바꿔주어서 리로드 없이 페이지의 내용이 바뀔 수 있도록 함.
  // <a href=""> 부분의 queryString을 가져오게 됨`
  var queryData = url.parse(_url, true).query; // /?id=HTML
  var pathname = url.parse(_url, true).pathname;
  // console.log(pathname);
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

  // path가 없는 경로로 접속했다면 =
  if (pathname === "/") {
    if (queryData.id === undefined) {
      // Home 같은 경우에는 title과 description을 직접 변수로 지정해서 알려주고 있음
      // 특정 디렉토리에서 파일을 읽어서 description 변수값을 생성해주는 코드는 필요없음.

      // fs.readdir(검색하고 싶은 디렉토리, 이 후 실행할 함수)
      fs.readdir("./data", function (error, filelist) {
        // filelist → 디렉토리 안에 있는 값들이 되어야 함
        // console.log(filelist);
        var title = "Welcome!";
        var description = "Hello, Node.js";

        /*
                var list = `            
                <ul>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=javaScript">JavaScript</a></li>
                </ul>`;
                */
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );

        // queryString으로 바꾸고 싶은 부분 : title, h2

        // queryData.id : queryString의 아이디 값
        // response.end() : 응답본문 작성
        response.writeHead(200);
        response.end(html);
      });
      // id 값이 있는 경우의 코드
    } else {
      fs.readdir("./data", function (error, filelist) {
        // filelist → 디렉토리 안에 있는 값들이 되어야 함
        // console.log(filelist);
        /*
                var list = `            
                <ul>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=javaScript">JavaScript</a></li>
                </ul>`;
                */
        var filteredId = path.parse(queryData.id).base;
        console.log(filteredId);
        fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
          var title = queryData.id; // HTML
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags: ["h1"]
          });
          var list = template.list(filelist);
          // delete 버튼을 누르면 다른 페이지로 이동없이 바로 그 자리에서 삭제하고 싶음 > link로 만들면 안됨 > form 버튼으로 구현하기
          var html = template.HTML(
            sanitizedTitle,
            list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `
                <a href="/create">create</a>
                <a href="/update?id=${sanitizedTitle}">update</a>
                <form action="delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                </form>
                `
          );
          // update할 부분을 queryString으로 전달한다
          // queryString으로 바꾸고 싶은 부분 : title, h2

          // queryData.id : queryString의 아이디 값
          // response.end() : 응답본문 작성
          response.writeHead(200);
          response.end(html);
        });
      });
    }

    // 그 외의 경로로 접속했다면 에러표시
  } else if (pathname === "/create") {
    // if문과 elseIf문 모두를 만족시키지 못할 때에 아래의 else문을 실행한다.

    fs.readdir("./data", function (error, filelist) {
      // filelist → 디렉토리 안에 있는 값들이 되어야 함
      // console.log(filelist);
      var title = "WEB - Create";

      /*
            var list = `            
            <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=javaScript">JavaScript</a></li>
            </ul>`;
            */
      var list = template.list(filelist);
      var html = template.HTML(
        title,
        list,
        // <form> 태그의 action 속성은 폼 데이터(form data)를 서버로 보낼 때 해당 데이터가 도착할 URL을 명시합니다.
        `<form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`,
        ""
      );

      // queryString으로 바꾸고 싶은 부분 : title, h2

      // queryData.id : queryString의 아이디 값
      // response.end() : 응답본문 작성
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    // request → createServer()에 전달된 콜백함수 인자 중 하나로
    // 요청할 때 웹 브라우저가 보낸 정보들 의미
    // response : 응답할 때, 우리(서버)에서 웹 브라우저에 전송한 정보들
    // 웹브라우저가 보낸 정보들 안에 POST가 존재함
    // 웹 브라우저가 대용량의 데이터들을 POST 방식으로 데이터를 전송할 때, 효율성 등을 고려하여 일부분만을 여러 번에 걸쳐 전송함. 그리고 서버가 이러한 데이터를 수신할 때마다 콜백함수를 호출하고, data라는 인자를 통해서 수신한 정보를 주기로 약속함.
    // 콜백이 실행될 때 마다 데이터를 추가해줌.

    //EVENT
    request.on("data", function (data) {
      // 들어오는 정보를 계속 body에 더해줌
      body = body + data;
    });
    // 데이터가 조각조각 들어오다가, 더이상 들어올 정보가 없으면 아래 콜백함수를 실행한다. === 아래의 콜백함수가 실행되면 데이터의 수신이 끝났다.
    request.on("end", function () {
      var post = qs.parse(body);
      // console.log(post.title);
      // console.log(post);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, {
          Location: `/?id=${title}`
        });
        response.end();
      });
    });

    // update를 눌렀을 때 해당 항목의 내용이 표시됨
  } else if (pathname === "/update") {
    fs.readdir("./data", function (error, filelist) {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        var title = queryData.id; // HTML
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          // form에서 submit을 했을때, 정보를 어디로 보낼 것인가? update_process
          // input의 기본값으로 title의 값이 들어오게됨(input value)
          // 단, textarea의 기본값은 textarea 태그의 안쪽에 써준다.
          // 수정하기 전 내용이 각각의 input에 들어가게 됨
          // 필요정보 : submit를 눌러 update_process로 수정된 데이터를 전송할때, 어떤 데이터를 수정할지 알 수 있어야 한다.
          // > 이 때, title 변수를 전달하면 문제가 생김 > 왜? 사용자가 제목을 수정할 수 있기 때문
          // hidden type의 input은 수정된 데이터를 어디다가 전달할 지 알려주는 지표역할만 할 뿐, 화면에 표시되어서는 안됨
          ` 
                <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
                `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    // update_process를 받아서 저장하기
    // POST 방식으로 들어온 데이터를 받음
    var body = "";
    // request → createServer()에 전달된 콜백함수 인자 중 하나로
    // 요청할 때 웹 브라우저가 보낸 정보들 의미
    // response : 응답할 때, 우리(서버)에서 웹 브라우저에 전송한 정보들
    // 웹브라우저가 보낸 정보들 안에 POST가 존재함
    // 웹 브라우저가 대용량의 데이터들을 POST 방식으로 데이터를 전송할 때, 효율성 등을 고려하여 일부분만을 여러 번에 걸쳐 전송함. 그리고 서버가 이러한 데이터를 수신할 때마다 콜백함수를 호출하고, 데이터라는 인자를 통해서 수신한 정보를 주기로 약속함.
    // 콜백이 실행될 때 마다 데이터를 추가해줌.

    //EVENT
    request.on("data", function (data) {
      body = body + data;
    });
    // 데이터가 조각조각 들어오다가, 더이상 들어올 정보가 없으면 아래 콜백함수를 실행한다. === 아래의 콜백함수가 실행되면 데이터의 수신이 끝났다.
    request.on("end", function () {
      var post = qs.parse(body);
      // console.log(post.title);
      // console.log(post);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      // title과 description이 수정되었다 = 데이터의 이름과 내용도 수정되어야 함
      // fs.rename(oldPath, newPath, callBack);
      // 작업이 끝난 후엔 callback 함수를 실행해라.
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, "utf8", function (err) {
          response.writeHead(302, {
            Location: `/?id=${title}`
          });
          response.end();
        });
      });

      // post정보로 데이터가 잘 왔는지 확인하기
      // console.log(post);
    });
  } else if (pathname === "/delete_process") {
    // update_process를 받아서 저장하기
    // POST 방식으로 들어온 데이터를 받음
    var body = "";
    // request → createServer()에 전달된 콜백함수 인자 중 하나로
    // 요청할 때 웹 브라우저가 보낸 정보들 의미
    // response : 응답할 때, 우리(서버)에서 웹 브라우저에 전송한 정보들
    // 웹브라우저가 보낸 정보들 안에 POST가 존재함
    // 웹 브라우저가 대용량의 데이터들을 POST 방식으로 데이터를 전송할 때, 효율성 등을 고려하여 일부분만을 여러 번에 걸쳐 전송함. 그리고 서버가 이러한 데이터를 수신할 때마다 콜백함수를 호출하고, 데이터라는 인자를 통해서 수신한 정보를 주기로 약속함.
    // 콜백이 실행될 때 마다 데이터를 추가해줌.

    //EVENT
    request.on("data", function (data) {
      body = body + data;
    });
    // 데이터가 조각조각 들어오다가, 더이상 들어올 정보가 없으면 아래 콜백함수를 실행한다. === 아래의 콜백함수가 실행되면 데이터의 수신이 끝났다.
    request.on("end", function () {
      var post = qs.parse(body);
      // console.log(post.title);
      // console.log(post);
      var id = post.id;
      // title과 description이 수정되었다 = 데이터의 이름과 내용도 수정되어야 함
      fs.unlink(`data/${id}`, function (error) {
        // 홈으로 보내줌 > id 정보가 없는 곳으로
        response.writeHead(302, {
          Location: `/`
        });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
  console.log(url.parse(_url, true).pathname);
  // url 정보를 분석해서 사용자가 쉽게 정보를 가져다 쓸 수 있도록 함.
  // path : queryString을 포함함
  // pathname : 실제로 queryString이 있다 하더라도(전체 URL에), queryString을 제외한 주소를 보여줌
});
// 3000번 포트에 nodejs 웹 서버를 실행시키겠다.
app.listen(3000);

// Not found 오류 구현
// 기능1 : queryString이 없는 페이지로 들어왔을 때, welcome 페이지를 띄워줌
// 기능2 : 존재하지 않는 다른 페이지로 들어왔을 경우, 사용자에서 파일을 찾을 수 없다는 메세지를 띄어줌