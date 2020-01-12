var fs = require('fs');

// readFileSync

/*
console.log("A");
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result); // B
console.log("C");
*/

console.log("A");
// sync가 있으면 동기적으로 처리, sync가 없으면 비동기적으로 처리
// nodejs는 비동기적으로 처리하는 방식을 선호함

// readFileSync는 return값을 주는 데 비해, 
// readFile은 return 값을 주지 않으므로 함수를 세번째 인자로 줌.
// 파일을 읽는(첫번째 인자) 작업이 끝나면 콜백함수(세번째 인자)를 실행한다.
// 콜백함수를 실행해서 에러가 나면 첫번째 파라미터를 값으로 주고, 아니라면 두번째 파라미터를 값으로 준다.
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
 // B
console.log("C");

// A가 실행이 된 후, 원래대로라면 B가 실행되어야 하지만 B가 실행되기도 이전에 (B가 코드를 처리하는 동안) C가 실행되어서 콘솔로 나타나는 순서는 A > C > B가 됨.

