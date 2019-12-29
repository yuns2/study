var name = 'Yun gyung';
var letter = name + "'s Story. \n\
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam quisque id diam vel. Sem viverra aliquet eget sit amet tellus cras adipiscing. Id leo in vitae turpis massa sed elementum tempus. Felis imperdiet proin fermentum leo vel orci porta. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Eu lobortis elementum nibh tellus molestie nunc. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Ut tellus elementum sagittis vitae et leo. Cursus eget nunc scelerisque viverra mauris. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Scelerisque eu ultrices vitae auctor eu augue ut.";
console.log(letter);

// 줄바꿈을 하고 싶다면 줄이 바뀌는 지점에 역슬래쉬(\)를 써준다.(오류 제거)
// 다만 이것은 코드상에서 줄바꿈이 된 것일뿐, 실제로 문자가 표현될 때는 줄바꿈이 적용되지 않는다.
// → 실제 문자를 표현하는 데에 있어서도 줄바꿈을 표시하고 싶다면 마찬가지로 줄이 바뀌는 지점에 \n을 써준다.

// literal?
var a = 1;
// → 이 때 1은 숫자라는 데이터를 표현하는 리터럴
// literal : 정보를 표현하는 방버, 혹은 정보를 표현하는 기호 정도로 이해


var letter = `${name}'s Story.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam quisque id diam vel. Sem viverra aliquet eget sit amet tellus cras adipiscing. Id leo in vitae turpis massa sed elementum tempus. Felis imperdiet proin fermentum leo vel orci porta. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Eu lobortis elementum nibh tellus molestie nunc. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Ut tellus elementum sagittis vitae et leo. Cursus eget nunc scelerisque viverra mauris. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Scelerisque eu ultrices vitae auctor eu augue ut.`;
console.log(letter);
