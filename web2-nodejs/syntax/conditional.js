var myArgs = process.argv;
console.log(myArgs);
// console.log(myArgs[2]);
// console.log(myArgs[3]);

// console.log('a');
// console.log('b');
// 입력값은 문자 처리 된다.
var args = parseInt(myArgs[2]);
if(args === 1){
    console.log('c1');
}else{
    console.log('c2');
}
// console.log('d');