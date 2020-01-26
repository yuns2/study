// var M = {
//     v:'v',
//     f:function(){
//         console.log(this.v);
//     }
// }

// mpart(같은 디렉토리에 있음)에서 exports한 모듈을 요청한다(불러온다).
var part = require('./mpart.js');
console.log(part);
// {v: 'v', f: [function:f]}
// 객체가 나옴 > mpart에서 exports 했던 객체 M
// M.f();

part.f();