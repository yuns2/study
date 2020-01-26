module.exports = {
    HTML : function (title, list, body, control){
        return `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
        </body>
        </html>`;
    },
    list : function (filelist){
        var list = '<ul>';
        var i = 0;
        // filelist라는 값이 필요한데, 함수 내에는 값이 없음 → 값을 입력받아야 함
        while(i<filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list+'</ul>';
        return list;
    } 
}

// module.exports = template;