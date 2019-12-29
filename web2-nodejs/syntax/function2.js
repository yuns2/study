// Math는 round, random, floor 등의 메서드를 공통으로 적용하기 위한 일종의 객체.
// 그리고 위의 메서드들은 javascript에 이미 내장되어 있는 함수로, '내장함수'라고 한다.
// Math.round() : ()안의 숫자를 반올림.
console.log(Math.round(1.6));
console.log(Math.round(1.4));

// sum이 입력값을 받기 위해서는 sum을 호출한 부분과 sum을 정의한 부분을 매개해 주는 변수가 필요함 → 매개변수
function sum(a,b){
    // console.log(a);
    // console.log(b);
    // console.log(a+b);
    // return : 그 즉시 실행을 종료하고 값을 반환한다. → 어떤 값을 출력한다는 의미와, 함수를 종료한다는 의미 모두를 내포하고 있다.
    return a+b;
}
sum(2,4)
console.log(sum(2,4));


Math.round(1.6)
// 실행을 되었을 건데, 실행 결과가 출력이 안됨
// → 내장함수의 특징 : 출력하기 위해서 console.log();을 비롯한 다양한 메서드를 이용할 수 있다.

// ↓ 아래 함수들 작동안함. 임의로 만든 가짜 명령
// filewrite('result.txt', Math.round(1.6));
// email('sugar_plumi@naver.com', Math.round(1.6));
console.log(Math.round(1.6));