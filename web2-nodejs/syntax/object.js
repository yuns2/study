var members = ['현정', '선율', '윤경'];
// console.log(members[1]);
var student = {
    name : '윤경',
    age : 28,
    hobby : 'sleeping'
}
// console.log(student.age);

var i = 0;
while(i<members.length){
    console.log(`${i} : `, members[i]);
    i = i+1;
}
for(var info in student){
    console.log(info, student[info]);
}