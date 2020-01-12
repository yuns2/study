// function a(){
//     console.log('A');
// }

// 익명함수 : 이름이 없는 함수

// a라는 변수의 값으로서 함수를 정의하고 있음
// → 자바스크립트에서는 함수가 값이다 ***
var a = function (){
    console.log('A');
}

// 콜백함수의 개념 : function slowfunc의 기능의 실행이 끝난 다음에, 실행이 끝났으니 다음 코드를 실행하라고 가르쳐 주는 것 → 인자로 콜백을 받음(이 인자는 또 다른 함수임)
function slowfunc(callback){
    callback();
}

// slowfunc라는 함수가 실행이 되고, 파라미터는 a가 가리키는 함수를 갖게됨
slowfunc(a);