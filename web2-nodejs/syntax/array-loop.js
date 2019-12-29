var number = [1,400,12,34];
var i = 0;
var sum = 0;
// 자료의 길이에 따라서 반복 횟수가 달라질 수 있다면 훨씬 좋은 코드가 될 수 있다.
while(i<number.length){
    // 일단 값을 하나하나 꺼내어 보자!
    console.log(number[i]);
    var sum = sum + number[i];
    i = i+1;
}
console.log(sum);